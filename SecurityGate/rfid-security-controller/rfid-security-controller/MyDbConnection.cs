using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace rfid_security_controller
{
    public class MyDbConnection
    {
        public MyDbConnection()
        {
        }

        public string Server { get; set; }
        public string DatabaseName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

        private MySqlConnection Connection { get; set; }

        private MyDbConnection _instance = null;
        public MyDbConnection Instance()
        {
            if (_instance == null)
                _instance = new MyDbConnection();
            return _instance;
        }

        public bool IsConnect()
        {
            if (Connection == null)
            {
                if (String.IsNullOrEmpty(DatabaseName))
                    return false;
                string connstring = string.Format("Server={0}; database={1}; UID={2}; password={3}", Server, DatabaseName, Username, Password);
                Connection = new MySqlConnection(connstring);
                Connection.Open();
            }

            return true;
        }



        public void Close()
        {
            Connection.Close();
        }

        public List<string> GetBorrowedBooks()
        {
            List<string> books = new List<string>();
            MyDbConnection conn = new MyDbConnection();
            conn.Server = "localhost";
            conn.DatabaseName = "testdb";
            conn.Username = "root";
            conn.Password = "4123";
            if (conn.IsConnect())
            {
                //suppose col0 and col1 are defined as VARCHAR in the DB
                string query = "SELECT tid FROM tbl_borrowed_books";
                var cmd = new MySqlCommand(query, conn.Connection);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    string tid = reader.GetString(0);
                    books.Add(tid);
                }
                conn.Close();
            }
            return books;
        }

    }
}
