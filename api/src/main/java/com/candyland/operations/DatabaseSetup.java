package com.candyland.operations;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

public class DatabaseSetup {

    /**
     * Full path to the database's location. TODO : change it, too hardcoded
     */
    public static final String PATH = "/home/gbax/testdb/";

    /**
     * Connect to a new database
     *
     * @param fileName
     *            the db's name
     */
    public static void createNewDatabase(String dbName) {

        String url = "jdbc:sqlite:" + PATH + dbName;

        try (Connection conn = DriverManager.getConnection(url)) {
            if (conn != null) {
                DatabaseMetaData meta = conn.getMetaData();
                System.out.println("The driver name is " + meta.getDriverName());
                System.out.println("A new database has been created.");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    /**
     * Creates a new table.
     */
    public static void createNewTable(String dbName, String tableName) {
        // SQLite connection string
        String url = "jdbc:sqlite:" + PATH + dbName;

        // SQL statement for creating a new table
        String sql = "CREATE TABLE IF NOT EXISTS " + tableName
                + "(id INTEGER PRIMARY KEY, firstName VARCHAR(20), lastName VARCHAR(20))";

        try (Connection conn = DriverManager.getConnection(url); Statement stmt = conn.createStatement()) {
            // create a new table
            stmt.execute(sql);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

    /**
     * Connect to a database
     * 
     * @return the Connection object
     */
    public static Connection connect(String dbName) {
        // SQLite connection string
        String url = "jdbc:sqlite:" + PATH + dbName;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection(url);
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
        return conn;
    }
}