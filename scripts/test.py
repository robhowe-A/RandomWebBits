import os

mypath = 'dist/img'
imgfilenames = []

def main():
    jpegcount = 0
    jpgcount = 0
    svgcount = 0
    pngcount = 0
    webpcount = 0
    filecounts = [jpegcount, jpgcount, svgcount, pngcount, webpcount]

    def extswitch(extension):
        match extension:
            case ".txt":
                
                print(extension)
                return False
            case ".jpeg":
                filecounts[0] += 1
                print(extension)
                return True
            case ".jpg":
                filecounts[1] += 1
                print(extension)
                return True
            case ".svg":
                filecounts[2] += 1
                print(extension)
                return True
            case ".png":
                filecounts[3] += 1
                print(extension)
                return True
            case ".webp":
                filecounts[4] += 1
                print(extension)
                return True


    # traverse root directory, and list directories as dirs and files as files
    for (root, dirs, files) in os.walk(mypath, topdown=True):
        for file in files:
            ext = os.path.splitext(file)[-1].lower()
            keeptest = extswitch(ext)
            if not keeptest:
                break
            imgfilenames.append(file)


    print("++++++++++++++++++++++++++++++++++++++++")
    print("Total files in image folder: %i"%len(imgfilenames))
    print("Total jpeg images: %i"%filecounts[0])
    print("Total jpg images: %i"%filecounts[1])
    print("Total svg images: %i"%filecounts[2])
    print("Total png images: %i"%filecounts[3])
    print("Total webp images: %i"%filecounts[4])


    print()

main()
#loop through imagefilenames.
#For each image file name, create an entry:
#    /img/<filename.filetype>
#        Content-Type: image/<filetype>;
