package kacirekj.myweb.controller;

import kacirekj.myweb.dao.BooksDao;
import kacirekj.myweb.domain.Author;
import kacirekj.myweb.domain.Book;
import kacirekj.myweb.domain.Dealer;
import kacirekj.myweb.repository.BookRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
public class IndexController {

    private BookRepository bookRepository;

    public IndexController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<Book> books = StreamSupport.stream(bookRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        model.addAttribute("books", books);
        Set<Author> authors = new HashSet<>();
        authors.add(new Author());
        authors.add(new Author());
        authors.add(new Author());


        Set<Dealer> dealers = new HashSet<>();
        dealers.add(new Dealer());
        dealers.add(new Dealer());
        dealers.add(new Dealer());


        bookRepository.save(new Book("Kniha", authors, dealers, new Author()));
        return "index";
    }

    @GetMapping("/status-event-table")
    public String eventTable(@RequestParam(value = "limit", required = false) Integer limit) {
//      model.addAllAttributes(getModel(limit));
        return "fragments/status :: events-table";
    }
}
