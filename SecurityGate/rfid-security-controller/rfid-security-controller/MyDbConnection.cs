using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;

namespace rfid_security_controller
{
    public class MyDbConnection
    {
        public MyDbConnection()
        {
            Server = "localhost";
            DatabaseName = "library_rfid";
            Username = "root";
            Password = "4123";
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
            if (conn.IsConnect())
            {
                string query = "SELECT rfid FROM security_deactivated_copy";
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

        public void SaveLog(int id)
        {
            MyDbConnection conn = new MyDbConnection();
            if (conn.IsConnect())
            {
                string query = "INSERT INTO security_gate_log (logged_at, book_copy_id) values (@now, @id)";
                var cmd = new MySqlCommand(query, conn.Connection);
                cmd.Parameters.AddWithValue("@now", DateTime.Now);
                cmd.Parameters.AddWithValue("@id", id);
                cmd.ExecuteNonQuery();
                conn.Close();
            }
        }

        public int GetCopyIdByRfid(string rfid)
        {
            int id = -1;
            MyDbConnection conn = new MyDbConnection();
            if (conn.IsConnect())
            {
                Console.WriteLine("HELLo "+rfid);
                string query = "SELECT id FROM book_copy WHERE rfid = " + rfid;
                var cmd = new MySqlCommand(query, conn.Connection);
                var reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Console.WriteLine("HELLo " + reader.GetInt32(0));
                    id = reader.GetInt32(0);
                }
                conn.Close();
            }
            return id;
        }

    }
}
