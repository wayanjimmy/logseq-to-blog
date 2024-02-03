while true; do
    rsync -av --exclude-from='.gitignore' . /mnt/c/Users/Jimmy/Downloads/logseq-to-blog
    sleep 5
done