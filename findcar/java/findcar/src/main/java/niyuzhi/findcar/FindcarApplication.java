package niyuzhi.findcar;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("niyuzhi.findcar.mapper")
public class FindcarApplication {

    public static void main(String[] args) {
        SpringApplication.run(FindcarApplication.class, args);
    }

}
