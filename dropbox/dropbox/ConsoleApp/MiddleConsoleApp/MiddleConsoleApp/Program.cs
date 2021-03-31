using System;
using System.IO.Ports;
using System.Threading;
using System.Timers;

namespace MiddleConsoleApp
{
    class Program
    {
        static SerialPort _serialPortUHF;
        static SerialPort _serialPortBookDrop;

        static bool isBDScanning = false;
        static int count = 0;
        static String bookList;
        static System.Timers.Timer aTimer;
        public static void Main(string[] args)
        {
            Thread readUHFThread = new Thread(ReadUHF);
            Thread readBDThread = new Thread(ReadBookDrop);

            aTimer = new System.Timers.Timer();
            aTimer.Elapsed += new ElapsedEventHandler(OnTimedEvent);
            aTimer.Interval = 10;
            aTimer.Enabled = false;

            _serialPortUHF = new SerialPort();
            _serialPortBookDrop = new SerialPort();
            try
            {
                _serialPortUHF.PortName = "COM31";
                _serialPortUHF.BaudRate = 9600;
                _serialPortUHF.Parity = Parity.None;
                _serialPortUHF.DataBits = 8;
                _serialPortUHF.StopBits = StopBits.One;
                _serialPortUHF.Open();
                _serialPortUHF.WriteLine("#CONX");

                _serialPortBookDrop.PortName = "COM30";
                _serialPortBookDrop.BaudRate = 9600;
                _serialPortBookDrop.Parity = Parity.None;
                _serialPortBookDrop.DataBits = 8;
                _serialPortBookDrop.StopBits = StopBits.One;
                _serialPortBookDrop.Open();

                readUHFThread.Start();
                readBDThread.Start();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }

        public static void ReadUHF()
        {
            while (true)
            {
                try
                {
                    string message = _serialPortUHF.ReadLine();
                    Console.WriteLine(message);
                    if (isBDScanning)
                    {
                        bookList += message + ";";
                    }
                    Thread.Sleep(100);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);

                }
            }
        }


        public static void ReadBookDrop()
        {
            while (true)
            {
                try
                {
                    string message = _serialPortBookDrop.ReadLine();
                    Console.WriteLine("BD: " + message);
                    if (message.Contains("#START"))
                    {
                        isBDScanning = true;
                        aTimer.Enabled = true;
                    }
                    Thread.Sleep(100);
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);

                }
            }
        }


        private static void OnTimedEvent(object source, ElapsedEventArgs e)
        {
            count++;
            Console.WriteLine("Count = " + count);
            if (count == 200)
            {
                _serialPortBookDrop.WriteLine(bookList);
                _serialPortBookDrop.WriteLine("#STOP");
                bookList = "";
                count = 0;
                isBDScanning = false;
                aTimer.Enabled = false;
            }
        }
    }
}
