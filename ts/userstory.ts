import $ from 'jquery';

namespace userStoryModule{
    export class userStory {
        title: string;
        role: string;
        attitude: string;
        reason: string;

        constructor(
            title: string,
            role: string,
            attitude: string,
            reason: string) {
                this.title = title;
                this.role = role;
                this.attitude = attitude;
                this.reason = reason;
            }
    }

    export class userStoryArray {
        array: Array<userStory>;

        constructor() {
            this.array = [];
        }

        push(
            title:string,
            role:string,
            want:string,
            reason:string) {
            if (title.length > 0 && role.length > 0 && want.length > 0 && reason.length > 0) {
                var userStory = new userStoryModule.userStory(
                    title,
                    role,
                    want,
                    reason
                );
                this.array.push(userStory);
            } else {
                alert("必ずすべての項目を埋めてください。");
            }
            
        }

        disp(cardsContainer: JQuery<HTMLElement>) {
            cardsContainer.children().remove();
            this.array.forEach(story => {
                cardsContainer.append('<div class="col-sm"></div>');
                cardsContainer.children().last().append('<div class="card"></div>');
                var newCard = cardsContainer.children().last().children().last();
                newCard.append('<h3>'+ story.title + '</h3>');
                newCard.append('<p>'+ story.role + 'として、</p>');
                newCard.append('<p>'+ story.attitude + 'したい。</p>');
                newCard.append('<p>なぜなら、'+ story.reason + 'だからだ！</p>');
            });
        }

        toCsvString() {
            return this.array
                .map(story => story.title + "," + story.role + "," + story.attitude + "," + story.reason)
                .join('\n');
        }

        downloadAsCsv(name: string) {
            const anchor: any = document.createElement('a');
            if (window.URL && anchor.download !== undefined) {
                const bom = '\uFEFF';
                const blob = new Blob([bom, this.toCsvString()], {type: 'text/csv'});
                anchor.download = name;
                anchor.href = window.URL.createObjectURL(blob);
                document.body.appendChild(anchor);
                anchor.click();
                anchor.parentElement.remove();
            }
        }

        pushFrom(target: HTMLElement) {
            var card = target.parentElement?.children[1];
            if (card != null) {
                var title = card.children[0] as HTMLInputElement;
                var role = card.children[1] as HTMLInputElement;
                var want = card.children[2] as HTMLInputElement;
                var reason = card.children[3] as HTMLInputElement;
                
                this.push(
                    title.value,
                    role.value,
                    want.value,
                    reason.value
                );

                const cardsContainer = $('#cards-container').children().last()
                this.disp(cardsContainer);
            }
        }
    }
}

window.onload = () => {
    var userStoriesArray = new userStoryModule.userStoryArray();
    console.log(userStoriesArray);

    $('#btn-submit-card').click(btn => {
        userStoriesArray.pushFrom(btn.target);
    })

    $('#btn-download-cards').click(btn => {
        userStoriesArray.downloadAsCsv('output.csv');
    })

    $('body')[0].addEventListener('keypress', e => {
        if (e.keyCode == 13) {
            userStoriesArray.pushFrom($('#btn-submit-card')[0]);
        }
    })
}

