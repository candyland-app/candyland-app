package com.candyland.utility;


import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Multipart;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.activation.*;
import javax.mail.internet.MimeMultipart;

public class SimpleEmailDemo {
   public static void main(String[] args) {
      // Recipient's email ID needs to be mentioned.
      String to = "konsmitr@gmail.com";//change accordingly

      // Sender's email ID needs to be mentioned
      String from = "teamcandyland6@gmail.com";//change accordingly
      final String username = "teamcandyland6";//change accordingly
      final String password = "Aa012345";//change accordingly

      // Assuming you are sending email through relay.jangosmtp.net
      String host = "smtp.gmail.com";

      Properties props = new Properties();
      props.put("mail.smtp.auth", "true");
      props.put("mail.smtp.starttls.enable", "true");
      props.put("mail.smtp.host", host);
      props.put("mail.smtp.port", "587");

      // Get the Session object.
      Session session = Session.getInstance(props,
      new javax.mail.Authenticator() {
         protected PasswordAuthentication getPasswordAuthentication() {
            return new PasswordAuthentication(username, password);
         }
      });

      try {
         // Create a default MimeMessage object.
         Message message = new MimeMessage(session);

         // Set From: header field of the header.
         message.setFrom(new InternetAddress(from));

         // Set To: header field of the header.
         message.setRecipients(Message.RecipientType.TO,
         InternetAddress.parse(to));

         // Set Subject: header field
         message.setSubject("Your ticket from Candyland");

         // Now set the actual message
         message.setText("Thank you for purchasing your ticket from our platform. You are now able to show it at the event's entrance!");
         // Send message

         MimeBodyPart messageBodyPart = new MimeBodyPart();

         Multipart multipart = new MimeMultipart();

         messageBodyPart = new MimeBodyPart();
         String file = "/Users/konstantinos/Documents/InProgress/candyland-app/backend/order123.pdf";
         String fileName = "order123.pdf";
         DataSource source = new FileDataSource(file);
         messageBodyPart.setDataHandler(new DataHandler(source));
         messageBodyPart.setFileName(fileName);
         multipart.addBodyPart(messageBodyPart);

         message.setContent(multipart);
         Transport.send(message);

         System.out.println("Sent message successfully....");

      } catch (MessagingException e) {
            throw new RuntimeException(e);
      }
   }
}
