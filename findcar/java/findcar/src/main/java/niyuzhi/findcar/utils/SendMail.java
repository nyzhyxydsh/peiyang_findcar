package niyuzhi.findcar.utils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class SendMail {

    @Autowired
    private JavaMailSender sender;

    public void sendSimpleMail(String message,String userName) {
        SimpleMailMessage message1 = new SimpleMailMessage();
        message1.setFrom("793672781@qq.com");
        message1.setTo("793672781@qq.com");
        message1.setSubject("小程序意见反馈-"+userName);
        message1.setText(message);
        sender.send(message1);
    }
}
