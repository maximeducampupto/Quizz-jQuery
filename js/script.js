let questions = [
    {
        enonce: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, tempora?",
        reponses : [
            "Laurie",
            "Amandine",
            "Sophie",
            "Anne-lise"
        ],
        rightAnswer: "Laurie"
    },
    {
        enonce: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, tempora?",
        reponses : {
            1: "Laurie",
            2: "Amandine",
            3: "Sophie",
            4: "Anne-Lise"
        },
        rightAnswer: 3,
    },
    {
        enonce: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, tempora?",
        reponses : {
            1: "Laurie",
            2: "Amandine",
            3: "Sophie",
            4: "Anne-Lise"
        },
        rightAnswer: 1
    },
    {
        enonce: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, tempora?",
        reponses : {
            1: "Laurie",
            2: "Amandine",
            3: "Sophie",
            4: "Anne-Lise"
        },
        rightAnswer: 3,
    },
    {
        enonce: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, tempora?",
        reponses : {
            1: "Laurie",
            2: "Amandine",
            3: "Sophie",
            4: "Anne-Lise"
        },
        rightAnswer: 1
    },
    {
        enonce: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, tempora?",
        reponses : {
            1: "Laurie",
            2: "Amandine",
            3: "Sophie",
            4: "Anne-Lise"
        },
        rightAnswer: 3,
    },
    {
        enonce: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, tempora?",
        reponses : {
            1: "Laurie",
            2: "Amandine",
            3: "Sophie",
            4: "Anne-Lise"
        },
        rightAnswer: 1
    },
    {
        enonce: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat, tempora?",
        reponses : {
            1: "Laurie",
            2: "Amandine",
            3: "Sophie",
            4: "Anne-Lise"
        },
        rightAnswer: 3,
    },
];


let Game = {

    currentQuestion : 0,
    currentDisplayedQuestion : 1,
    resultsArray : [
        [], // Right Answers
        {} // Wrong Answers
    ],
    isRunning : false,

    init: function()
    {

        $.each(questions, function(index, value)
        {
            let div = $('<div></div>')
                    .addClass('question-wrapper')
                    .attr('id', 'question' + parseInt(Game.currentQuestion + 1)),

                h1  = $('<h1></h1>').text('Question ' + parseInt(Game.currentQuestion + 1)),
                flex = $('<div></div>').addClass('answers-wrapper'),
                p   = $('<p></p>').text(value.enonce);

            Game.currentQuestion++;

            div.append(h1);
            div.append(p);

            $.each(value.reponses, function (index, value)
            {
                let rep =  $('<p></p>').text(value).addClass('answer');
                flex.append(rep);
            });

            div.append(flex);

            $('.wrapper').append(div);
        });

        $('.wrapper > div:not(#starting-block)').hide();

        $('#start').click(Game.start);
    },

    start: function()
    {
        $('#starting-block').hide();

        Game.displayQuestion(Game.currentDisplayedQuestion);

    },

    displayQuestion: function(id)
    {
        let question = $('#question' + id);

        question.show();

        Game.handleInput();
    },

    handleInput: function()
    {
        $('p.answer').click(function(e)
        {
            let userAnswer = $(this).text();

            if (userAnswer === questions[id - 1].rightAnswer)
            {
                Game.resultsArray[0].push(`${userAnswer} est une bonne réponse!`);
            } else {
                Game.resultsArray[1].push(
                    {
                        result: `Dommage! ${userAnswer} est une mauvaise réponse!`,
                        rightAnswer : questions[id - 1].rightAnswer
                    }
                )
            }
        });
    }
};

Game.init();