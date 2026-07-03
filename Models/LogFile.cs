//--Copyright (c) 2025-2026 Robert A. Howell

namespace RWBDotnetTypeScript.Models
{
    internal class LogFile
    {

        internal sealed class Create : LogFile, IDisposable
        {
            public string Dir { get; set; }
            public string Path { get; set; }
            public bool IsNew { get; set; } = default;

            private FileStream? fs;
            private StreamWriter? sw;

            // Instantiate this object with appropriate flags to ensure directory creation
            public Create(string Dir, string Path, bool createDirectory, bool createOnInstantiation)
            {
                this.Dir = Dir;
                this.Path = Path;
                if (createOnInstantiation)
                    Instantiate(createDirectory);
            }

            // Call this method to force create a directory and new log file
            public void Instantiate(bool createDirectory)
            {
                bool directoryExists = CheckDirectoryExists();
                if (createDirectory && !directoryExists)
                {
                    var dirCreated = Directory.CreateDirectory(Dir);
                    directoryExists = CheckDirectoryExists();
                    Console.WriteLine("Directory({2}) created: {0} {1}",
                        dirCreated.CreationTime.ToShortDateString(),
                        dirCreated.CreationTime.ToLongTimeString(), dirCreated.FullName);
                }
                if (!directoryExists) throw new DirectoryNotFoundException("Encountered a problem at the specified directory.");

                if (!File.Exists(Path))
                {
                    fs = File.Create(Path);
                    IsNew = true;
                    fs.Close();
                }

                sw = File.AppendText(Path);

                bool CheckDirectoryExists()
                {
                    return Directory.Exists(Dir);
                }
            }

            public override string ToString()
            {
                return $"Directory: \n\t{Dir}\nPath: \n\t{Path}";
            }

            public void WriteLog(string log)
            {
                if (sw == null)
                    throw new ApplicationException("Stream writer not instantiated.");

                sw.Write(log);
                //sw.Close();
            }

            public void Dispose()
            {
                sw?.Close();
            }

            }
        };
}
