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
        rightAnswer: "Vrai"
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
        rightAnswer: "Oui"
    },
    {
        enonce: "En jQuery, que cible $('.header-item > p')",
        reponses : [
            "Les paragraphes enfants d'un div de classe 'header-item'",
            "Les paragraphes de classe 'header-item'",
            "Les éléments de classe 'header-item' supérieurs aux éléments 'p'",
            "Les éléments de classe 'header-item' inférieurs aux éléments 'p'"
        ],
        rightAnswer: "Les paragraphes enfants d'un div de classe .header-item"
    },
    {
        enonce: "En jQuery, quelle méthode utiliser pour ajouter un nouvel enfant à un élément 'monElement' ?",
        reponses : [
            "monElement.append(enfant)",
            "monElement.html(enfant)",
            "monElement.add(enfant)",
            "enfant.getParent(monElement)"
        ],
        rightAnswer: "monElement.append(enfant)"
    },
    {
        enonce: "En JavaScript natif, peut-on obtenir le même résultat que la méthode jQuery .hide() ?",
        reponses : [
            "Oui",
            "Non",
            "Zbradaraldjan",
        ],
        rightAnswer: "Laurie"
    },
];


let Game = {
    currentQuestion : 0,
    resultsArray : [],
    isRunning : false,
    userAnswered : false,
    rightAnswers : 0,
    wrongAnswers : 0,

    init: function()
    {
        $('#start').click(Game.start);
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

        $('.wrapper').append(div);

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
                               result: `${userAnswer} est une bonne réponse!`,
                           }
                       );
                   } else {
                       Game.resultsArray.push(
                           {
                               result: `Dommage! ${userAnswer} est une mauvaise réponse`,
                               rightAnswer: rightAnswer
                           }
                       );

                       if (Game.resultsArray.length === 10)
                       {
                           Game.displayResults();
                       }
                   }

                   Game.userAnswered = false;
                   l(Game.resultsArray);

               }

               $('.question-wrapper').remove();

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



        $('#score-wrapper').show();
    }
};

Game.init();