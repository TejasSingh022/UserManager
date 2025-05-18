package com.demo.snowflakeApp.snowflakeApp;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.sql.SQLException;
import java.util.Properties;

public class App {

    public static void main(String[] args) {
        // 
    	String account = "DEMO_ACC"; // e.g., xy12345.us-east-1
        String user = "DEMO_USER";
        String password = "demo_pass";
        String warehouse = "DEMO_WAREHOUSE";
        String database = "demo_db";
        String schema = "PUBLIC"; // Change if your schema is different
        
        // 
        String jdbcUrl = "jdbc:snowflake://" + account + ".snowflakecomputing.com";
        
        // Create connection properties
        Properties properties = new Properties();
        properties.put("user", user);
        properties.put("password", password);
        properties.put("warehouse", warehouse);
        properties.put("db", database);
        properties.put("schema", schema);
        
        try {
            // 
            Class.forName("net.snowflake.client.jdbc.SnowflakeDriver");
            
            System.out.println("Connecting to Snowflake...");
            
            // Establish connection
            try (Connection connection = DriverManager.getConnection(jdbcUrl, properties)) {
                System.out.println("Connected successfully!");
                
                // Create a statement
                try (Statement statement = connection.createStatement()) {
                    
                    // Execute query
                    String query = "SELECT * FROM users;";
                    try (ResultSet resultSet = statement.executeQuery(query)) {
                        
                        // Process results
                        System.out.println("\nUser Data:");
                        
                        while (resultSet.next()) {
                            String name = resultSet.getString("NAME");
                            String email = resultSet.getString("EMAIL");
                            String phone = resultSet.getString("PHONE");
                            System.out.printf("%s %s %s%n", name, email, phone);
                        }
                    }
                }
            }
        } catch (ClassNotFoundException e) {
            System.err.println("Snowflake JDBC driver not found.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.err.println("Error connecting to Snowflake: " + e.getMessage());
            e.printStackTrace();
        }
    }
}