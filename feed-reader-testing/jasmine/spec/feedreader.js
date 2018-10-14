/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* TEST SUITE 1
     * "RSS Feed" 
     */
    describe('RSS Feeds', function() {
        /* TEST 1.1
         * It tests to make sure that the allFeeds variable
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TEST 1.2
         * It tests to make sure that has a URL defined
         * and that the URL is not empty.
         */
        it('have in each feed a defined url', function() {
            for (let i in allFeeds) {
                expect(allFeeds[i].url).toBeDefined();
                expect(typeof allFeeds[i].url).toBe('string');
                expect(allFeeds[i].url).not.toBe('');
            };
        });

        /* TEST 1.3
         * It tests to make sure that has a name defined
         * and that the name is not empty.
         */
        it('have in each feed a defined name', function() {
            for (let j in allFeeds) {
                expect(allFeeds[j].name).toBeDefined();
                expect(typeof allFeeds[j].name).toBe('string');
                expect(allFeeds[j].name).not.toBe('');
            };
        });
    });

    /* TEST SUITE 2
     * "The menu"
     */
    describe('The menu', function() {
        /* TEST 2.1
         * It tests to make sure that the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* TEST 2.2
         * It tests to make sure that the menu changes
         * visibility when the menu icon is clicked.
         */
        it('changes visibility when is clicked', function() {
            let menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* TEST SUITE 3
     * "Initial Entries"
     */
    describe('Initial Entries', function() {
        /* TEST 3.1
         * It tests to make sure that the loadFeed function is
         * called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('has at least 1 entry', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /* TEST SUITE 4
     * "New Feed Selection"
     */
    describe('New Feed Selection', function() {
        /* TEST 4.1
         * It tests to make sure that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */   
        let prevFeedData,
            newFeedData;

        beforeEach(function(done) {
            loadFeed(0, function() {
                // Load and store previous Feed data
                prevFeedData = $('.feed').html();

                loadFeed(1, function(){
                    // Load and store new Feed data
                    newFeedData= $('.feed').html();
                    // Start tests
                    done();
                });
            });
        });

        it('has a different content than previous one', function() {
            expect(prevFeedData).not.toBe(newFeedData);
        });
    });
}());
