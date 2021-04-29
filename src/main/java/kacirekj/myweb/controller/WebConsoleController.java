package kacirekj.myweb.controller;

import kacirekj.myweb.dao.BooksRepository;
import kacirekj.myweb.domain.Author;
import kacirekj.myweb.domain.Book;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Controller
public class WebConsoleController {

    private BooksRepository booksRepository;

    public WebConsoleController(BooksRepository booksRepository) {
        this.booksRepository = booksRepository;
    }

    @GetMapping("/")
    public String index(Model model) {
        List<Book> books = StreamSupport.stream(booksRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
        model.addAttribute("books", books);
        booksRepository.save(new Book("Kniha", new Author()));
        return "index";
    }

    @GetMapping("/status-event-table")
    public String eventTable(@RequestParam(value = "limit", required = false) Integer limit) {
//      model.addAllAttributes(getModel(limit));
        return "fragments/status :: events-table";
    }
}
