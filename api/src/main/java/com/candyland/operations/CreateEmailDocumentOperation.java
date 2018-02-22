package com.candyland.operations;

import java.io.IOException;

import org.apache.commons.text.WordUtils;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import com.candyland.entities.Event;
import com.candyland.entities.Order;
import com.candyland.entities.Parent;
import com.candyland.entities.Provider;
import com.candyland.entities.Ticket;

/**
 * The operation used to create documents in PDF format.
 */
public class CreateEmailDocumentOperation {

    /**
     * The customer whomst'th info are going to be added to the document.
     */
    Parent customer;

    /**
     * The business organizing the event.
     */
    Provider business;

    /**
     * The event for which the ticket was bought.
     */
    Event event;

    /**
     * The ticket the customer bought.
     */
    Ticket ticket;

    /**
     * The order to which the ticket is bound.
     */
    Order order;

    /**
     * The document exported from this operation. 
     */
    PDDocument document;

    /**
     * Makes the document
     * 
     * @throws IOException
     */
    public void execute() throws IOException {
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream contentStream = new PDPageContentStream(document, page);

        String text = formatMessage();
        String[] wrT = WordUtils.wrap(text, 100).split("\\r?\\n");
        for (int i = 0; i < wrT.length; i++) {
            contentStream.beginText();
            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 10);
            contentStream.newLineAtOffset(50, 600 - i * 15);
            contentStream.showText(wrT[i]);
            contentStream.endText();
        }

        contentStream.close();
        
        document.save("ticket" + ticket.getTicketId() + ".pdf");
        document.close();
        
        this.document = document;
    }

    private String formatMessage() {
        StringBuilder message = new StringBuilder();
        message.append("Dear Mr/Mrs " + 
                customer.getLastName() + 
                StringConstants.COMMA + 
                StringConstants.SPACE);
        message.append("Thank you very much for buying a ticket for our event: " +
                event.getName() + 
                StringConstants.COMMA + 
                StringConstants.SPACE);
        message.append("which is to be held on " + 
                event.getStartDate().toString() +
                StringConstants.DOT +
                StringConstants.SPACE);
        message.append("Your order has been confirmed, with ID: " + 
                order.getOrderId().toString() + 
                StringConstants.DOT +
                StringConstants.SPACE);
        message.append("Your ticket, with ID: " + 
                ticket.getTicketId().toString() +
                StringConstants.SPACE +
                "cost " + 
                ticket.getTicketCost() +
                StringConstants.SPACE +
                "and was bought with your card ending in: " +
                String.format("%4d", order.getPaymentCard() % 10000) + 
                StringConstants.DOT + 
                StringConstants.SPACE);
        message.append("Respectfully " + 
                business.getFirstName() + 
                StringConstants.SPACE + 
                "from " +
                business.getCompanyName() +
                StringConstants.EXCL_MARK);
        
        return message.toString();
    }

    public Parent getCustomer() {
        return customer;
    }

    public void setCustomer(Parent customer) {
        this.customer = customer;
    }

    public Provider getBusiness() {
        return business;
    }

    public void setBusiness(Provider business) {
        this.business = business;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }

    public Ticket getTicket() {
        return ticket;
    }

    public void setTicket(Ticket ticket) {
        this.ticket = ticket;
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

}
