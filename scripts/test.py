import os

def main():
    mypath = 'dist/img'
    path = mypath.split("/")[1]
    imgfilenames = []
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
        imgfilenames.extend(files)

    print(my_files_path)

    # filter files list of any .txt files
    imgfilenamescpy = imgfilenames
    for file in imgfilenamescpy:
        ext = os.path.splitext(file)[-1].lower()
        keeptest = extswitch(ext)
        if not keeptest:
            imgfilenamescpy.remove(file)
        file = path + "/" + file
        print(file)


    print("++++++++++++++++++++++++++++++++++++++++")
    print("Total images in folder: %i"%len(imgfilenamescpy))
    print("Total txt files: %i"%filecounts[0])
    print("Total jpeg images: %i"%filecounts[1])
    print("Total jpg images: %i"%filecounts[2])
    print("Total svg images: %i"%filecounts[3])
    print("Total png images: %i"%filecounts[4])
    print("Total webp images: %i"%filecounts[5])
    print("++++++++++++++++++++++++++++++++++++++++")

    return imgfilenames
filenames = []
filesnames = main()
#loop through imagefilenames.
for file in filesnames:
    print(file)
#For each image file name, create an entry:
headersfilepath = "dist/_headers"
with open(headersfilepath, 'a', encoding="UTF=8") as headers:
    headers.write("\n'")
#    /img/<filename.filetype>
#        Content-Type: image/<filetype>;
