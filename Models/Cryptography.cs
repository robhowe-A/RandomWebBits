//--Copyright (c) 2026 Robert A. Howell

using System.Runtime.InteropServices;

namespace RWBDotnetTypeScript.Models
{
    internal class Cryptography
    {
        public sealed class SHA3_256
        {
            public string GetDigest(byte[] data)
            {
                string logIpAddr = string.Empty;
                try
                {
                    var ipDigest = System.Security.Cryptography.SHA3_256.HashData(data);
                    
                    if (ipDigest.Length > 0)
                        logIpAddr = Convert.ToHexStringLower(ipDigest);
                }
                catch (ArgumentNullException e)
                {
                    throw new InvalidDataException($"Invalid {nameof(data)}.");
                    //LOGLEAF logFile.WriteLog($"{this} {DateTime.Now.ToShortTimeString()} Invalid hash data argument. \n");
                }
                catch (PlatformNotSupportedException e)
                {
                    throw new SEHException();
                    //LOGLEAF logFile.WriteLog($"{this} {DateTime.Now.ToShortTimeString()} Hashing platform not supported. \n");
                }

                return logIpAddr;
            }

        };
    };
}
