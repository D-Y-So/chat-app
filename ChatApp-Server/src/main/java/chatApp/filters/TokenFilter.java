package chatApp.filters;

import chatApp.entities.Response;
import chatApp.filters.entities.MutableHttpServletRequest;
import chatApp.service.AuthService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TokenFilter implements Filter {
    public static final Logger logger = LogManager.getLogger(TokenFilter.class);
    private final AuthService authService;
    public TokenFilter(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Called by the web container to indicate to a filter that it is being placed into service.
     * The servlet container calls the init method exactly once after instantiating the filter.
     * The init method must complete successfully before the filter is asked to do any filtering work.
     * @param filterConfig The configuration information associated with the
     *                     filter instance being initialised
     *
     * @throws ServletException
     */
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        Filter.super.init(filterConfig);
    }

    /**
     * Processes a request/response pair passed through the Filter Chain due to a client request for a resource at the end of the chain.
     * The token in the header of the request is being checked, if token is valid and correct, this filter passes on the request and response to the next entity in the chain.
     * If token invalid the filter return an Unauthorized response.
     *
     * @param servletRequest  The request to process
     * @param servletResponse The response associated with the request
     * @param filterChain    Provides access to the next filter in the chain for this
     *                 filter to pass the request and response to for further
     *                 processing
     *
     * @throws IOException if an I/O exception occurs during the processing of the request/response.
     * @throws ServletException if the processing fails.
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        logger.info("Auth filter is working on the following request: " + servletRequest);
       //TODO: String url = ((HttpServletRequest) request).getRequestURL().toString(); if(url.contains("auth") {do the filter} else {filterChain.doFilter(req,res);}
        MutableHttpServletRequest req =new MutableHttpServletRequest ((HttpServletRequest) servletRequest);
        HttpServletResponse res = (HttpServletResponse) servletResponse;
        String authToken = req.getHeader("Authorization");
        if (authToken != null) {
            Response<Integer> tokenCorrect = authService.isTokenCorrect(authToken);
            if(tokenCorrect.isSucceed())
            {
                req.setAttribute("userId", tokenCorrect.getData());
               filterChain.doFilter(req,res);
            }
            else returnBadResponse(res);
        }
        else returnBadResponse(res);
    }

    /**
     * Sends an error response to the client using status code 401, with message Unauthorized.
     * @param res, HttpServletResponse object, contains response to a servlet request.
     * @throws IOException, if an input or output exception occurs.
     */
    private void returnBadResponse(HttpServletResponse res) throws IOException {
        res.sendError(401, "Unauthorized");
    }

    /**
     * indicate to a filter that it is being taken out of service.
     * This method is only called once all threads within the filter's doFilter method have exited or after a timeout period has passed.
     * After the web container calls this method, it will not call the doFilter method again on this instance of the filter.
     * This method gives the filter an opportunity to clean up any resources that are being held.
     */
    public void destroy() {
        Filter.super.destroy();
    }
}