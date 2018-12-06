function l(what)
{
    console.log(what);
}

function a(what)
{
    alert(what);
}

let questions = [
    {
        enonce: 'En jQuery,quelle est la bonne manière de sélectionner un paragraphe avec une classe de "texte"',
        reponses : [
            '$(<p>class="texte"</p>)',
            "$('p#texte')",
            "$('p.texte')",
            "$(.texte > p)"
        ],
        rightAnswer: "$('p.texte')"
    },
    {
        enonce: 'A quelle propriété CSS peut-on donner la valeur: "3px dotted royalblue"',
        reponses : [
            "Margin",
            "Border",
            "Padding",
            "Pudding"
        ],
        rightAnswer: "Border"
    },
    {
        enonce: "En JavaScript, un tableau peut contenir un tableau d'objets",
        reponses : [
            "Vrai",
            "Faux",
            "Peut-être?",
        ],
        rightAnswer: "Vrai",
        blue : true
    },
    {
        enonce: "Comment se nomment les caractères qui suivent une instruction conditionnelle ?",
        reponses : [
            "Parenthèses",
            "Moustaches",
            "Pistaches",
            "Accolades"
        ],
        rightAnswer: "Accolades"
    },
    {
        enonce: "Peut-on associer du jQuery et du JavaScript dans un même fichier ?",
        reponses : [
            "Oui",
            "Non",
        ],
        rightAnswer: "Oui"
    },
    {
        enonce: "Quel attribut permet de cibler le chemin d'accès d'une image",
        reponses : [
            "source",
            "path",
            "src",
            "type"
        ],
        rightAnswer: "src"
    },
    {
        enonce: "L'utilisateur peut-il empêcher votre script JavaScript de s'éxécuter?",
        reponses : [
            "Oui",
            "Non",
            "Il peut toujours essayer",
        ],
        rightAnswer: "Oui",
        blue : true
    },
    {
        enonce: "En jQuery, que cible $('.header-item > p')",
        reponses : [
            "Les paragraphes enfants d'un div de classe 'header-item'",
            "Les paragraphes de classe 'header-item'",
            "Les éléments de classe 'header-item' supérieurs aux éléments 'p'",
            "Les éléments de classe 'header-item' inférieurs aux éléments 'p'"
        ],
        rightAnswer: "Les paragraphes enfants d'un div de classe 'header-item'"
    },
    {
        enonce: "En jQuery, quelle méthode utiliser pour ajouter un nouvel enfant à un élément 'monElement' ?",
        reponses : [
            "monElement.append(enfant)",
            "monElement.html(enfant)",
            "monElement.add(enfant)",
        ],
        rightAnswer: "monElement.append(enfant)",
        blue: true
    },
    {
        enonce: "En JavaScript natif, peut-on obtenir le même résultat que la méthode jQuery .hide() ?",
        reponses : [
            "Oui",
            "Non",
        ],
        rightAnswer: "Oui"
    },
];


let Game = {
    currentQuestion : 0,
    resultsArray : [],
    userAnswered : false,
    rightAnswers : 0,

    init: function()
    {
        $('#start').click(Game.start);
        Timer.start();
        $('#score-wrapper').hide();
    },

    start: function()
    {
        $('#starting-block').hide();
        Game.displayQuestion(Game.currentQuestion);
    },

    displayQuestion: function(id)
    {
        let div = $('<div></div>')
                .addClass('question-wrapper')
                .attr('id', 'question' + parseInt(id));

        let h1  = $('<h1></h1>').text('Question ' + parseInt(id + 1)),
            flex = $('<div></div>').addClass('answers-wrapper'),
            p   = $('<p></p>').text(questions[id].enonce),
            currentAnswer = 0;

        div.append(h1);
        div.append(p);

        $.each(questions[Game.currentQuestion].reponses, function (index, value)
        {
            let rep =  $('<p></p>')
                .text(value)
                .addClass('answer')
                .attr('id', 'answer' + currentAnswer );

            flex.append(rep);

            currentAnswer++;
        });

        div.append(flex);

        currentAnswer = 0;

        div.hide();
        $('.wrapper').append(div);

        if (questions[id].hasOwnProperty('blue'))
        {
            $('.answers-wrapper p:nth-child(3)').attr('style', 'background-color : rgba(0, 0, 123, 0.4) !important;');
        }

        div.show(200);
        Game.handleInput();
    },

    handleInput: function()
    {
        let answers = $('.answer');

        for (let i = 0; i < answers.length; i++)
        {
           $('#answer' + i).click(function()
           {
               if (!Game.userAnswered)
               {
                   Game.userAnswered = true;
                   let userAnswer = $(this).text(),
                       question = questions[Game.currentQuestion],
                       rightAnswer = question.rightAnswer;


                   if (userAnswer === rightAnswer)
                   {
                       Game.resultsArray.push(
                           {
                               result: `Vous avez répondu: ${userAnswer}`,
                           }
                       );
                       Game.rightAnswers++;
                   } else {
                       Game.resultsArray.push(
                           {
                               result: `Dommage! Vous avez répondu: ${userAnswer}`,
                               rightAnswer: rightAnswer
                           }
                       );
                   }
                   if (Game.resultsArray.length === 10)
                   {
                       Game.displayResults();
                   }
               }

               $('.question-wrapper').remove();

               Game.userAnswered = false;

               Game.currentQuestion++;

               if (questions[Game.currentQuestion])
               {
                   Game.displayQuestion(Game.currentQuestion);
               }
           })
        }
    },

    displayResults: function()
    {
        Timer.stop();

        let score = $('<p></p>').text(`${Game.rightAnswers} / 10 bonnes réponses trouvées en ${Timer.getEndTime()}`),
            wrapper = $('#score-wrapper');

        score.attr('id', 'scoreDisplay');
        wrapper.append(score);

        Game.resultsArray.forEach(function (item, index) {

            let div = $('<div></div>').addClass('result-wrapper'),
                h2  = $('<h2></h2>').text(`Question ${parseInt(index + 1)}:`),
                question = $('<p></p>').text(questions[index].enonce),
                p   = $('<p></p>').text(item.result);


            div.append(h2).append(question).append(p);

            if (item.hasOwnProperty('rightAnswer'))
            {
                let p2 = $('<p></p>').html(`La bonne réponse était: ${item.rightAnswer}`);
                div.append(p2);
                div.addClass('wrongAnswer');
            } else {
                let p2 = $('<p></p>').html(`Bonne réponse!`);
                div.append(p2);
                div.addClass('rightAnswer');
            }

            wrapper.append(div);

        });


        wrapper.show();
    }
};


let Timer = {

    time: null,
    timeOut: null,
    endTime: null,

    start: function()
    {
        Timer.timeOut = setTimeout(function()
        {
            Timer.time++;
            Timer.start();
            l(Timer.time);
        }, 1000)
    },

    stop: function()
    {
        clearTimeout(Timer.timeOut);
        Timer.endTime = Timer.time;
        Timer.time = null;
    },

    getEndTime: function() {
        let minutes = Math.floor(Timer.endTime / 60),
            seconds = Math.floor(Timer.endTime % 60);

        // minutes =  minutes < 10 && minutes > 0 ? '0' + minutes : minutes;
        // console.log(minutes);

       if (minutes > 0)
       {
           return `${minutes} min et ${seconds} secs`;
       } else {
           return `${seconds} secs`;
       }
    }
};



Game.init();