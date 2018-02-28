package com.candyland.utility;

import java.util.Locale;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.candyland.domain.Order;
import com.candyland.domain.User;

@Component
public class MailConstructor {

    @Autowired
    private Environment env;

    @Autowired
    private TemplateEngine templateEngine;

    /**
     * the document's filename.
     */
    String filename;

    /**
     * path to the file.
     */
    String filePath;

    MimeBodyPart attachment = new MimeBodyPart();

    public SimpleMailMessage constructNewUserEmail(User user, String password) throws MessagingException {
        String message = "\nUser Credentials." + "\nUsername:" + user.getUsername() + "\nPassword:" + password;
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Candyland - New User");
        email.setText(message);
        email.setFrom(env.getProperty("support.email"));

        return email;
    }

    public MimeMessagePreparator constructOrderConfirmationEmail(User user, Order order, Locale locale) {
        Context context = new Context();
        context.setVariable("order", order);
        context.setVariable("user", user);
        context.setVariable("orderItemList", order.getOrderItemList());
        String text = templateEngine.process("orderConfirmationEmailTemplate", context);

        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper email = new MimeMessageHelper(mimeMessage);
                email.setTo(user.getEmail());
                email.setSubject("Order Confirmation" + order.getId());
                email.setText(text, true);
                email.setFrom(new InternetAddress("yankun@gmail.com"));
                String attachmentFilename = "order" + order.getId() + ".pdf";
                email.addAttachment(attachmentFilename, new FileDataSource("tickets/" + attachmentFilename));
            }
        };
        return messagePreparator;
    }
}
