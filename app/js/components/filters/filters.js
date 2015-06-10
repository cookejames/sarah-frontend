(function() {
    /**
     * Turn a minute of the day integer to a string like 09:30
     * @param input
     * @returns {*}
     */
    function minuteToTime(input) {
        if (Number(input) !== input || input % 1 !== 0) {
            return input;
        }
        var hours = parseInt(input / 60);
        var mins = input % 60;

        var pad = '00';
        hours = (pad+hours).slice(-pad.length);
        mins = (pad+mins).slice(-pad.length);

        return hours + ':' + mins;
    }

    angular.module('sarahApp.filters', []).
        filter('minuteToTime', function() { return minuteToTime });
})();