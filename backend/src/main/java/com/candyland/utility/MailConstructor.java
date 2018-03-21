package com.candyland.utility;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import javax.activation.FileDataSource;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import com.candyland.domain.CartItem;
import com.candyland.domain.Order;
import com.candyland.domain.User;

@Component
public class MailConstructor {

    @Autowired
    private Environment env;

    @Autowired
    private TemplateEngine templateEngine;

    private CreateEmailDocumentOperation op;

    public SimpleMailMessage constructNewUserEmail(User user, String password) {
        String message = "\nPlease use the following credentials to log in "
                + "and edit your personal info including your own password." + "\nUsername:" + user.getUsername()
                + "\nPassword:" + password;

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Candyland - New User");
        email.setText(message);
        email.setFrom(env.getProperty("support.email"));
        return email;
    }

    public MimeMessagePreparator constructOrderConfirmationEmail(User user, Order order, Locale locale)
            throws IOException {
        Context context = new Context();
        context.setVariable("order", order);
        context.setVariable("user", user);
        context.setVariable("cartItemList", order.getCartItemList());
        String text = templateEngine.process("orderConfirmationEmailTemplate", context);

        List<String> orderFilenames = new ArrayList<>();

        op = new CreateEmailDocumentOperation();
        for (CartItem item : order.getCartItemList()) {
            op.setOrder(order);
            op.setEvent(item.getEvent());
            op.setPayment(order.getPayment());
            op.setUser(user);
            int index = order.getCartItemList().indexOf(item);
            op.setIndex(index);
            op.execute();
            orderFilenames.add("order" + order.getId().toString() + "_" + index + ".pdf");
        }

        MimeMessagePreparator messagePreparator = new MimeMessagePreparator() {
            @Override
            public void prepare(MimeMessage mimeMessage) throws Exception {
                MimeMessageHelper email = new MimeMessageHelper(mimeMessage, true);
                email.setTo(user.getEmail());
                email.setSubject("Candyland - Order Confirmation " + order.getId());
                email.setText(text, true);
                email.setFrom(new InternetAddress("teamcandyland6@gmail.com"));
                for (String filename : orderFilenames) {
                    try {
                        email.addAttachment(filename, new FileDataSource("tickets/" + filename));
                    } catch (Exception e) {
                        e.printStackTrace();
                        // most likely when the file is not properly created
                        // i'm in no mood to handle that...
                    }
                }
            }
        };
        return messagePreparator;
    }
}
