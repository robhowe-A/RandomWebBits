#--Copyright (c) 2025-2026 Robert A. Howell

import os

imgfilepaths = []

def main():
    mypath = 'src/library/img'
    path = mypath.split("/")[1]

    txtcount = 0
    jpegcount = 0
    jpgcount = 0
    svgcount = 0
    pngcount = 0
    webpcount = 0
    filecounts = [txtcount, jpegcount, jpgcount, svgcount, pngcount, webpcount]

    def extswitch(extension):
        match extension:
            case ".txt":
                filecounts[0] += 1
                return False
            case ".jpeg":
                filecounts[1] += 1
                return True
            case ".jpg":
                filecounts[2] += 1
                return True
            case ".svg":
                filecounts[3] += 1
                return True
            case ".png":
                filecounts[4] += 1
                return True
            case ".webp":
                filecounts[5] += 1
                return True

    # traverse root directory, and list directories as dirs and files as files
    for root, dirs, files in os.walk(mypath, topdown=False):
        for file in files:
            # create the file path
            filepath = os.path.join(root, file)
            # remove 'dist' from file path, then recreate
            imgfilepath = filepath.split(os.sep)
            imgfilepath.pop(0)
            imgfp = "/".join(imgfilepath)
            imgfilepaths.append(imgfp)

    # Add only valid extendsions
    for path in imgfilepaths:
        ext = os.path.splitext(path)[-1].lower()
        validext = extswitch(ext)
        if not validext:
            imgfilepaths.remove(path)

    print("++++++++++++++++++++++++++++++++++++++++")
    print("Total images in folder: %i"%len(imgfilepaths))
    print("Total txt files: %i"%filecounts[0])
    print("Total jpeg images: %i"%filecounts[1])
    print("Total jpg images: %i"%filecounts[2])
    print("Total svg images: %i"%filecounts[3])
    print("Total png images: %i"%filecounts[4])
    print("Total webp images: %i"%filecounts[5])
    print("++++++++++++++++++++++++++++++++++++++++")

    return imgfilepaths
main()
imgfilepaths.sort()

#For each image file name, create header entry:
headersfilepath = "src/_headers"
with open(headersfilepath, 'a', encoding="UTF=8") as headers:
    #Write the first line out for the image.
    headers.write("\n")
    for path in imgfilepaths:
        ext = os.path.splitext(path)[-1].lower()
        ext = ext.removeprefix(".")
        if ext == "svg":
            headers.write("/%s\n\tContent-Type: image/%s+xml;\n"%(path, ext))
        else:
            headers.write("/%s\n\tContent-Type: image/%s;\n"%(path, ext))

# 
# 
# /library/img/<filename.filetype>
#     Content-Type: image/<filetype>;
# /library/img/svg.svg
#   Content-Type: image/svg+xml;