package com.candyland.utility;

import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;

import com.candyland.domain.CartItem;
import com.candyland.domain.Event;
import com.candyland.domain.Order;
import com.candyland.domain.Payment;
import com.candyland.domain.User;

/**
 * The operation used to create documents in PDF format.
 */
public class CreateEmailDocumentOperation {

    /**
     * The customer.
     */
    User user;

    /**
     * The event for which the ticket was bought.
     */
    Event event;

    /**
     * The order to which the ticket is bound.
     */
    Order order;

    /**
     * The payment.
     */
    Payment payment;

    /**
     * The document exported from this operation.
     */
    PDDocument document;

    /**
     * Basically the index of the cart item.
     */
    Integer index;

    /**
     * Makes the document
     * 
     * @throws IOException
     */
    public void execute() throws IOException {
        PDDocument document = new PDDocument();

        for (CartItem item : order.getCartItemList()) {
            PDPage page = new PDPage();
            document.addPage(page);
            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            File image = new File("/home/gbax/Workspace/candyland-app/media/logo.png");
            PDImageXObject logo = PDImageXObject.createFromFileByContent(image, document);

            contentStream.drawImage(logo, 80.0f, 620.0f, 100.0f, 100.0f);

            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 10);
            contentStream.newLineAtOffset(50, 550);
            contentStream.showText("Thank you very much for buying a ticket for our event: " + event.getName() + ", ");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 10);
            contentStream.newLineAtOffset(50, 530);
            contentStream.showText("Your order has been confirmed, with ID: " + order.getId().toString() + ". ");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 10);
            contentStream.newLineAtOffset(50, 510);
            contentStream.showText("Your ticket ID is " + item.getId() + " (Quantity = " + item.getQty() + ")");
            contentStream.endText();

            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 10);
            contentStream.newLineAtOffset(50, 490);
            contentStream.showText("Price: " + order.getOrderTotal() + ", paid for with card ending in: "
                    + (Long.parseLong(order.getPayment().getCardNumber()) % 10000));
            contentStream.endText();

            contentStream.close();
        }

        document.save("tickets/order" + order.getId().toString() + "_" + index.toString() + ".pdf");
        document.close();

        this.document = document;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public PDDocument getDocument() {
        return document;
    }

    public void setDocument(PDDocument document) {
        this.document = document;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }

    public Integer getIndex() {
        return index;
    }

    public void setIndex(Integer index) {
        this.index = index;
    }

}
