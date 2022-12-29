package com.jinkyumpark.bookitout.app.quotation;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.jinkyumpark.bookitout.app.book.model.Book;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Getter @Setter
@NoArgsConstructor

@Entity
@Table(name = "Quotation")
public class Quotation {
    @Id
    @SequenceGenerator(name = "quotation_seq", sequenceName = "quotation_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "quotation_seq")
    @Column(name = "quotation_id")
    private Long quotationId;

    @Column(name = "page")
    private Integer page;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "from_who")
    private String from_who;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", referencedColumnName = "book_id", foreignKey = @ForeignKey(name = "quotation_book_fk"))
    @JsonIgnore
    private Book book;

    public Quotation(Integer page, String content, String from_who, Book book) {
        this.page = page;
        this.content = content;
        this.from_who = from_who;
        this.book = book;
    }
}
