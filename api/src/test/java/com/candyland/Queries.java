package com.candyland;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import com.candyland.operations.DatabaseSetup;

/**
 * Class where the basic queries may be written
 */
public class Queries {

    // TODO make every query safe

    /**
     * A query that fetches the whole table from the db.
     * 
     * @param dbName
     *            The database name
     * @param tableName
     *            The table name
     */
    public void selectAll(String dbName, String tableName) {
        String sql = "SELECT * FROM " + tableName;

        try (Connection conn = DatabaseSetup.connect(dbName);
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                // TODO agnostic way to print each column
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }

}
