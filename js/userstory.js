// import $ from 'jquery';
var userStoryModule;
(function (userStoryModule) {
    var userStory = /** @class */ (function () {
        function userStory(title, role, attitude, reason) {
            this.title = title;
            this.role = role;
            this.attitude = attitude;
            this.reason = reason;
        }
        return userStory;
    }());
    userStoryModule.userStory = userStory;
    var userStoryArray = /** @class */ (function () {
        function userStoryArray() {
            this.array = [];
        }
        userStoryArray.prototype.push = function (title, role, want, reason) {
            if (title.length > 0 && role.length > 0 && want.length > 0 && reason.length > 0) {
                var userStory = new userStoryModule.userStory(title, role, want, reason);
                this.array.push(userStory);
            }
            else {
                alert("必ずすべての項目を埋めてください。");
            }
        };
        userStoryArray.prototype.disp = function (cardsContainer) {
            cardsContainer.children().remove();
            this.array.forEach(function (story) {
                cardsContainer.append('<div class="col-sm-6 col-xs-12 col-md-4 col-lg-4"></div>');
                cardsContainer.children().last().append('<div class="card"></div>');
                var newCard = cardsContainer.children().last().children().last();
                newCard.append('<h3>' + story.title + '</h3>');
                newCard.append('<p>' + story.role + 'として、</p>');
                newCard.append('<p>' + story.attitude + 'したい。</p>');
                newCard.append('<p>なぜなら、' + story.reason + 'からだ！</p>');
            });
        };
        userStoryArray.prototype.toCsvString = function () {
            return this.array
                .map(function (story) { return story.title + "," + story.role + "," + story.attitude + "," + story.reason; })
                .join('\n');
        };
        userStoryArray.prototype.downloadAsCsv = function (name) {
            var anchor = document.createElement('a');
            if (window.URL && anchor.download !== undefined) {
                var bom = '\uFEFF';
                var blob = new Blob([bom, this.toCsvString()], { type: 'text/csv' });
                anchor.download = name;
                anchor.href = window.URL.createObjectURL(blob);
                document.body.appendChild(anchor);
                anchor.click();
                anchor.parentElement.remove();
            }
        };
        userStoryArray.prototype.pushFrom = function (target) {
            var _a;
            var card = (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.children[1];
            if (card != null) {
                var title = card.children[0];
                var role = card.children[1];
                var want = card.children[2];
                var reason = card.children[3];
                this.push(title.value, role.value, want.value, reason.value);
                var cardsContainer = $('#cards-container').children().last();
                this.disp(cardsContainer);
            }
        };
        return userStoryArray;
    }());
    userStoryModule.userStoryArray = userStoryArray;
})(userStoryModule || (userStoryModule = {}));
window.onload = function () {
    var userStoriesArray = new userStoryModule.userStoryArray();
    console.log(userStoriesArray);
    $('#btn-submit-card').click(function (btn) {
        userStoriesArray.pushFrom(btn.target);
    });
    $('#btn-download-cards').click(function (btn) {
        userStoriesArray.downloadAsCsv('output.csv');
    });
    $('body')[0].addEventListener('keypress', function (e) {
        if (e.keyCode == 13) {
            userStoriesArray.pushFrom($('#btn-submit-card')[0]);
        }
    });
};
