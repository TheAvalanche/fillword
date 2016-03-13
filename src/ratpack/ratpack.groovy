import static ratpack.groovy.Groovy.ratpack

ratpack {
    handlers {
        files {
            dir "public" indexFiles "index.html"
        }
    }
}