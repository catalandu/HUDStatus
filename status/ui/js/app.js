//Fixed By ScArY#7732
var visable = true;
window.ResourceName = 'status'

$(document).ready(function(){
	setInterval(() => {
		let mug = document.getElementById('mugshot').getBoundingClientRect();
		$.post('http://status/setMugShotPos', JSON.stringify({
			y: mug.y/window.innerHeight,
			x: mug.x/window.innerWidth,
			w: mug.width/window.innerWidth,
			h: mug.height/window.innerHeight
		}));
	}, 1000);

	$.post('http://status/NUIReady', JSON.stringify({}));
});

function setHUDDisplay(opacity) {
    $('#hud').css('opacity', opacity);
    $('.info-hud.radio').css('opacity', opacity);
    $('.info-hud.source').css('opacity', opacity);
    $('.info-hud.time-and-place').css('opacity', opacity);
};

function setHUDName(name) {
    $('#hud #player-fullname span').text(name);
};

function setHUDID(source) {
    $('#hud #source').text(source);
};


function setHUDJob(job) {
    if (job.job.name == 'nojob') {
        $('#hud #player-job').fadeOut(1000);
    } else {
        $('#hud #player-job').fadeIn(1000);
    };

    if (job.job.ext) {
        if (job.job.grade < 0) {
            $('#hud #job-name span').text(((job.job.ext).replace('_', ' ')).toUpperCase());
            $('#hud #job-img img').attr('src', './img/logo/jobs/' + job.job.ext + '.png');
            $('#hud #job-grade span').text('Off-Duty');
        } else {
            $('#hud #job-name span').text(((job.job.ext).replace('_', ' ')).toUpperCase());
            $('#hud #job-img img').attr('src', './img/logo/jobs/' + job.job.ext + '.png');
            $('#hud #job-grade span').text(job.job.grade_label);
        };
    } else {
        if (job.job.grade < 0) {
            $('#hud #job-name span').text(job.job.label);
            $('#hud #job-img img').attr('src', './img/logo/jobs/' + job.job.name + '.png');
            $('#hud #job-grade span').text('Off-Duty');
        } else {
            $('#hud #job-name span').text(job.job.label);
            $('#hud #job-img img').attr('src', './img/logo/jobs/' + job.job.name + '.png');
            $('#hud #job-grade span').text(job.job.grade_label);
        };
    };
};




function setHUDGang(gang) {
    if (gang.gang.name == 'nogang') {
        $('#hud #player-gang').fadeOut(1000);
    } else {
        $('#hud #player-gang').fadeIn(1000);
    };

    $('#hud #gang-name span').text((gang.gang.name).replace('_', ' '));

    if (gang.gang.name == 'Mafia') {
        $('#hud #gang-img img').attr('src', './img/logo/gangs/' + gang.gang.name + '.png');
    } else {
        $('#hud #gang-img img').attr('src', './img/logo/gangs/gang.png');
    };
    if (gang.gang.name == 'Army') {
        $('#hud #gang-img img').attr('src', './img/logo/gangs/' + gang.gang.name + '.jpg');
    } else {
        $('#hud #gang-img img').attr('src', './img/logo/gangs/gang.png');
    };

    $('#hud #gang-grade span').text(gang.gang.grade_label);
};

function updatePing(data) {
    var s = data.value;
    $("[name='ping']").html(s)
    var x = document.getElementById("ping");


    if (s > 1 && s < 70) {
        $('#player-ping img').attr('src', './img/logo/wifi_g.png');
        x.style.color = "#13e94a";
    } else if (s > 71 && s < 300) {
        $('#player-ping img').attr('src', './img/logo/wifi_y.png');
        x.style.color = "#e8f016";
    } else {
        $('#player-ping img').attr('src', './img/logo/wifi_r.png');
        x.style.color = "#f01616";
    };

}


function setHUDCash(money) {
    $('#hud #player-cash-texte').text(money);
};

function bitcoin(level) {
    $('#hud #player-coin-texte').text(level);
};

function setHUDData(data) {
    if (data.health <= 10.0) {
        $('#health-img').addClass('ticktok');
    } else {
        $('#health-img').removeClass('ticktok');
    };
    $('#health').css('width', data.health + '%');
    $('#armor').css('width', data.armor + '%');
};

function setGangIcon(value){
    if (value == 'defaultlogo'){
	  $("#hud #gang-img img").attr("src", 'url(assets/imgs/gang.png)');
    }else if (value == 'nil'){
      $("#hud #gang-img img").attr("src", 'url(assets/imgs/gang.png)');
    }else{
      $("#hud #gang-img img").attr("src", value);
    }
};
  
function setHUDStatus(data) {
    let hunger = data[0].percent;
    let thirst = data[1].percent;
    if (hunger <= 10.0) {
        $('#hud #hunger-img').addClass('ticktok');
    } else {
        $('#hud #hunger-img').removeClass('ticktok');
    };

    if (thirst <= 10.0) {
        $('#hud #thirst-img').addClass('ticktok');
    } else {
        $('#hud #thirst-img').removeClass('ticktok');
    };

    $('#hud #hunger').css('width', hunger + '%');
    $('#hud #thirst').css('width', thirst + '%');
};
window.addEventListener('message', (event) => {
    let data = event.data;
    switch (data.action) {

        case 'toggle':
            if (visable) {
                this.setTimeout(() => {	
                    $('#player-name').fadeOut(1);
                    $('#player-cash').fadeOut(1);
                    $('#server-name').fadeOut(1);
					$("[name='mugshot']").fadeOut(1);
					$('#hud #mugshot').fadeOut(1);
					$('#hud #player-coin').fadeOut(1);
                    $('#hud #player-gang').fadeOut(1);
					$('#hud #gang-grade span').fadeOut(1);
                    $('#hud #gang-img img').fadeOut(1);
                    $('#hud #gang-name span').fadeOut(1);
					$('#hud #player-job').fadeOut(1);
                    $('#hud #job-grade span').fadeOut(1);
                    $('#hud #job-img img').fadeOut(1);
                    $('#hud #job-name span').fadeOut(1);
                    $('#hud #player-ping').fadeOut(1);
                    $('#hud #ping').fadeOut(1);
                    $('#hud .player-hour').fadeOut(1);
                    $('#hud .discord-lnk').fadeOut(1);
                    $('#hud .player-id').fadeOut(1);
					$('#hud #player-bc').css({'background' : 'rgba(3, 4, 6, 0.0)'});
					$('#hud #mugshot').css({'background' : 'rgba(3, 4, 6, 0.0'});
					$('#hud #player-header').css({'background-color' : 'rgba(3, 4, 6, 0.0'});
					$('.right-status1').css({'transform' : 'rotate(-90deg)'});
					$('.left-status1').css({'transform' : 'rotate(-90deg)'});
					$('.left-status1').css({'top' : '4.80vw'});
					$('.left-status1').css({'left' : '2.0vw'});
                    $('.left-status2').fadeOut(1);
                    $('.right-status2').fadeOut(1);
                    $('.right-square-info').fadeOut(1);
                    $('.center-info').fadeOut(1);
                    $('.left-square-info').fadeOut(1);
                    $('.khat-vasat').fadeOut(1);
                }, 300)
            } else {
                $('#hud').fadeIn();
                this.setTimeout(() => {
					$('.right-square-info').fadeIn(1);
                    $('.center-info').fadeIn(1);
                    $('#hud #mugshot').fadeIn(1);
					$("[name='mugshot']").fadeIn(1);
                    $('.left-square-info').fadeIn(1);
                    $('.right-status1').css({'transform' : 'rotate(0deg)'});
                    $('.left-status1').css({'transform' : 'rotate(0deg)'});
					$('.left-status1').css({'top' : '7.4vw'});
					$('.left-status1').css({'left' : '0.5vw'});
                    $('#player-name').fadeIn(1);
                    $('#player-cash').fadeIn(1);
                    $('#server-name').fadeIn(1);
					$('#hud #player-coin').fadeIn(1);
                    $('#hud #player-gang').fadeIn(1);
					$('#hud #gang-grade span').fadeIn(1);
                    $('#hud #gang-img img').fadeIn(1);
                    $('#hud #gang-name span').fadeIn(1);
					$('#hud #player-job').fadeIn(1);
                    $('#hud #job-grade span').fadeIn(1);
                    $('#hud #job-img img').fadeIn(1);
                    $('#hud #job-name span').fadeIn(1);
                    $('#hud #player-ping').fadeIn(1);
                    $('#hud #ping').fadeIn(1);
                    $('#hud .player-hour').fadeIn(1);
                    $('#hud .discord-lnk').fadeIn(1);
                    $('#hud .player-id').fadeIn(1);
					$('#hud #player-bc').css({'background-color' : 'rgba(8, 8, 8, 0.1)'});
					$('#hud #mugshot').css({'background' : 'rgba(3, 4, 6, 0.3'});
					$('#hud #player-header').css({'background-color' : 'rgba(3, 4, 6, 0.3'});
                    $('.left-status2').fadeIn(1);
                    $('.right-status2').fadeIn(1);
                    $('.khat-vasat').fadeIn(1);
                }, 300)
            };
            visable = !visable;
            break;



        case 'setHUDDisplay':
            {
                setHUDDisplay(data.opacity);
                break;
            };

				
        case 'setHUDName':
            {
                setHUDName(data.name);
                break;
            };

        case 'setHUDID':
            {
                setHUDID(data.source);
                break;
            };

        case 'setHUDJob':
            {
                setHUDJob(data.job);
                break;
            };

        case 'setHUDGang':
            {
                setHUDGang(data.gang);
                break;
            };

        case 'setHUDPing':
            {
                setHUDPing(data.ping);
                break;
            };

        case 'setHUDData':
            {
                setHUDData(data.data);
                break;
            };

        case 'setHUDCash':
            {
                setHUDCash(data.money);
                break;
            };
			
		case 'bitcoin':
            {
                bitcoin(data.level);
                break;
            };

        case 'setHUDStatus':
            {
                setHUDStatus(data.data);
                break;
            };
	};
    if (event.data.action == "ping") {
        updatePing(event.data);
    } else if (event.data.action == "setGangIcon") {
        setGangIcon(event.data.icon);
    }
	
	
  function updateClock() {
    var now = new Date(),
        time = (now.getHours()<10?'0':'') + now.getHours() + ':' + (now.getMinutes()<10?'0':'') + now.getMinutes();

    document.getElementById('hour').innerHTML = [time];
    setTimeout(updateClock, 1000);
  }
  
  updateClock()
});

var cssId = 'style';
if (!document.getElementById(cssId)) {
    var head = document.getElementsByTagName('head')[0];
    var link = document.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.media = 'all';
    head.appendChild(link);
}

//Fixed By ScArY#7732