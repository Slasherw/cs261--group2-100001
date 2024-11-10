package com.example.crud;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;

@Service
public class DatabaseSetupService {
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void initializeDatabase() {
        String sql = """
            ALTER TABLE request ALTER COLUMN date NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN prefix NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN full_name NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN student_id NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN department NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN email NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN address NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN subdistrict NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN district NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN province NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN student_phone NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN parent_phone NVARCHAR(10);
            ALTER TABLE request ALTER COLUMN advisor NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN request_type NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN semester NVARCHAR(1);
            ALTER TABLE request ALTER COLUMN academic_year NVARCHAR(1);
            ALTER TABLE request ALTER COLUMN course_code NVARCHAR(8);
            ALTER TABLE request ALTER COLUMN course_name NVARCHAR(50);
            ALTER TABLE request ALTER COLUMN section NVARCHAR(6);
            ALTER TABLE request ALTER COLUMN reason NVARCHAR(200);
            ALTER TABLE request ALTER COLUMN status NVARCHAR(50);
            """;

        jdbcTemplate.execute(sql);
    }
}
