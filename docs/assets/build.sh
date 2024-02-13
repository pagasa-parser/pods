set -e

DRAWIO_SEARCH_PATHS=("drawio")
GOOGLE_FONTS_UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
: "${PODS_GRAPHIC_BORDER:=100}"
PODS_GRAPHIC_BORDER_SIDE=$((PODS_GRAPHIC_BORDER / 2))
PODS_PLATFORM=$(uname -s)

detectDrawio() {

    if [[ $PODS_PLATFORM == "MINGW"* ]]; then
        DRAWIO_SEARCH_PATHS+=("/c/Program Files/draw.io/draw.io.exe")
    elif [[ $PODS_PLATFORM == "MSYS_NT"* ]]; then
        DRAWIO_SEARCH_PATHS+=("/c/Program Files/draw.io/draw.io.exe")
    elif grep -q -i Microsoft /proc/version; then
        DRAWIO_SEARCH_PATHS+=("/mnt/c/Program Files/draw.io/draw.io.exe")
    fi

    for SEARCH_PATH in "${DRAWIO_SEARCH_PATHS[@]}"; do
        if command -v "$SEARCH_PATH" &> /dev/null; then
            DRAWIO_PATH="$SEARCH_PATH"
            break
        fi
    done

    if [[ -z "$DRAWIO_PATH" ]]; then
        echo "No draw.io executable found. Please install drawio and add it to your PATH."
        echo "For Windows (except when using WSL), you just need to install draw.io."
        exit 1
    fi
}

generateSvg() {
    /bin/find diagram -name '*.drawio' | while read -r file
    do
        file=$(basename "${file%.drawio}")
        if [[ -f "svg/$file.svg" ]]; then
            rm "svg/$file.svg"
        fi

        "$DRAWIO_PATH" -x -f svg --border $PODS_GRAPHIC_BORDER -o "svg/$file.svg" "diagram/$file.drawio"
        # Offset all the graphics by the border size, because for some reason this isn't done
        # by draw.io itself.
        sed -i "0,/<g>/{s/<g>/<g transform=\"translate($PODS_GRAPHIC_BORDER_SIDE, $PODS_GRAPHIC_BORDER_SIDE)\">/}" "svg/$file.svg"

        embedFonts "svg/$file.svg"
        addBackground "svg/$file.svg"

        if command -v git &> /dev/null; then
            git add "svg/$file.svg"
        fi
    done
}

googleFontsCssUrl() {
    echo "https://fonts.googleapis.com/css?family=$(echo "$1" | tr ' ' '+' | tr '\n' '|' | sed 's/|$//')"
}

embedFonts() {
    # Newline-delimited
    USED_FONTS=$(grep -ohP "(?<=font-family(?:: |=\"))[^;]+?(?=:;|\")" "$1" | /usr/bin/sort -u)

    if [[ -z "$USED_FONTS" ]]; then
        return
    fi

    echo "Embedding fonts: $USED_FONTS"

    # Get the Google Fonts CSS file
    GOOGLE_FONTS_CSS="$(curl "$(googleFontsCssUrl "$USED_FONTS")" -H "User-Agent: $GOOGLE_FONTS_UA" | tr -d '\n')"
    GOOGLE_FONTS_URLS="$(echo "$GOOGLE_FONTS_CSS" | grep -ohP '(?<=url\()[^)]+(?=\))' | /usr/bin/sort -u)"

    CSS_ROOT=":root {"

    for FONT_URL in $GOOGLE_FONTS_URLS; do
        echo "Embedding font: $FONT_URL"
        FONT_ID="$(basename "${FONT_URL%.*}" | tr -c '[:alnum:]' '-' | sed 's/-$//')"
        FONT_BASE64="$(curl "$FONT_URL" | base64 -w 0)"
        CSS_ROOT+="    --font-$FONT_ID: url('data:application/woff2;charset=utf-8;base64,$FONT_BASE64');\n"

        # Replace the font URL with the variable
        GOOGLE_FONTS_CSS="${GOOGLE_FONTS_CSS//"$FONT_URL"/var(--$FONT_ID)}"
    done

    CSS_ROOT+="}"

    GOOGLE_FONTS_CSS="$CSS_ROOT\n\n$GOOGLE_FONTS_CSS"

    # Embed this style in the SVG

    # Break apart the <defs/> tag if it's collapsed
    sed -i 's/<defs\/>/<defs><\/defs>/' "$1"
    # Insert into the start of the <defs> tag
    sed -i "0,/<defs>/{s#<defs>#<defs>\n<style type=\"text/css\">${GOOGLE_FONTS_CSS}</style>#}" "$1"
}

addBackground() {
    SVG_WIDTH=$(grep -ohP '(?<=width=")\d+px(?=")' -m 1 "$1")
    SVG_HEIGHT=$(grep -ohP '(?<=height=")\d+px(?=")' -m 1 "$1")

    # Insert before the start of the <g> tag
    sed -i "0,/<g/{s/<g/<rect width=\"$SVG_WIDTH\" height=\"$SVG_HEIGHT\" fill=\"\#ffffff\"\/><g/}" "$1"
}

detectDrawio
echo "Using draw.io from $DRAWIO_PATH"
mkdir -p svg
generateSvg

set +e
