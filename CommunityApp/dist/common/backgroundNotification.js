System.register(['common/pubSubEvent'], function (_export, _context) {
  "use strict";

  var Event, BackgroundNotification;
  return {
    setters: [function (_commonPubSubEvent) {
      Event = _commonPubSubEvent.default;
    }],
    execute: function () {
      _export('BackgroundNotification', BackgroundNotification = {
        received: new Event('backgroundNotification', 'received'),
        dropped: new Event('backgroundNotification', 'dropped')
      });

      _export('BackgroundNotification', BackgroundNotification);
    }
  };
});
//# sourceMappingURL=backgroundNotification.js.map
