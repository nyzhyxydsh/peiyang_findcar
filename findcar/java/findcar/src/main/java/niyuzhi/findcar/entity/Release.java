package niyuzhi.findcar.entity;

import lombok.Data;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Data
//发布者的数据库
public class Release {
    private Integer id;//系统自增
    private String userId;//用户id
    private String startAddress;
    private String endAddress;
    private String goDate;
    private String tel;
    private String peopleCount;//人数
    private String mark;
    private String releaseDate;
    private Boolean isShow;
    private String ftype;//人找车or车找人

    private Integer pageNum;
    private Integer pageSize;
    private List<WxUser> list;//响应的人

}
