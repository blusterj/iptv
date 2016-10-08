base64_encode = function(data) {
  var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do { // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = o1 << 16 | o2 << 8 | o3;

    h1 = bits >> 18 & 0x3f;
    h2 = bits >> 12 & 0x3f;
    h3 = bits >> 6 & 0x3f;
    h4 = bits & 0x3f;

    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  var r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
};

base64_decode = function(s) {
    var e={},i,b=0,c,x,l=0,a,r='',w=String.fromCharCode,L=s.length;
    var A="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for(i=0;i<64;i++){e[A.charAt(i)]=i;}
    for(x=0;x<L;x++){
        c=e[s.charAt(x)];b=(b<<6)+c;l+=6;
        while(l>=8){((a=(b>>>(l-=8))&0xff)||(x<(L-2)))&&(r+=w(a));}
    }
    return r;
};



Super_parser_external = function(e) {

    var c = e
    
    if (e.indexOf('.m3u8') > 0) {
        var page = API.Request(e);
        if (page.indexOf('BANDWIDTH') > 0) {
            var b = page.split(/\n/);
            for (var a = 0; a < b.length; a++) {
                var str = b[a];
                if (str.indexOf('BANDWIDTH') > 0) {
                    alert(parser(str, 'BANDWIDTH=', ','));
                    c = b[a + 1];
                    break;
                }
            }
            if (c.indexOf("http") < 0) {
                c = e.replace(e.split("/")[(e.split("/")).length-1], c);
                return c;
            } else {
                return c;
            }
        }else{
            return c;
        }
    }
    
    if (e.indexOf('911.to/get_cv/md5/') > 0) {
        c = i911_to(e);
        e = c
    }
    if (e.indexOf('hdrezka.tv/films') > 0) {
        c = hdrezka_film(e);
        e = c
    }
    if (e.indexOf('hdrezka.tv/series') > 0) {
        c = hdrezka_serial(e);
        e = c
    }
    if (e.indexOf('gidtv.cc') > 0) {
        c = hdrezka_gid(e);
        e = c
    }
    if (e.indexOf('divan.tv/') > 0) {
        var page = API.Request(e);
        c = parser(page, 'file: "','",');
        return c = Addidation_parser(c);
    }
    
    if (e.indexOf("bobfilm.net") > 0 || e.indexOf("bobfilm1.net") > 0) { //bobfilm
		console.log('bobfilm');
		var f = e.split('@');
        var html = API.Request(f[1]);
        var i = html.indexOf(f[2]);
		var forparse = html.substring((i - 70), (i + f[2].length));
		c = 'http://' + parser(forparse, 'http://', 'flv') + 'flv';
        return c;
    }
	if (e.indexOf("kinokong") > -1) { //bobfilm
		console.log('kinokong');
		var f = e.split('@');
        var html = API.Request(f[1]);
        var i = html.indexOf(f[2]);
		var forparse = html.substring((i - 70), (i + f[2].length));
		if(f[2].indexOf("flv") > 0){
			c = 'http://' + parser(forparse, 'http://', 'flv') + 'flv';
		}
		if(f[2].indexOf("mp4") > 0){
			c = 'http://' + parser(forparse, 'http://', 'mp4') + 'mp4';
		}
		console.log(c);
        return c;
    }
    
    if (e.indexOf('/onxa.ru/get.php') > 0){
        var page = API.Request(e);
        c = parser(page, "file : '",",");
        return c.replace('onxa.ru', '80.84.55.42');
    }

    
    if (e.indexOf('.videokub.com/embed/') > 0 || e.indexOf('.videokub.me/embed/') > 0) {
        var page = API.Request(e);
        c = parser(page, 'file:"','/",');
        return c = Addidation_parser(c);
    }
    
    if (e.indexOf('filmux.org') > 0) {
        var url = API.Request(e);
        a = parser(url,"http://srv",'"');
        var page = API.Request('http://srv'+a);
        b = parser(page,"file:'","'");
        return c = e.replace(c,b);
    }
    
    if (e.indexOf('vimeo.com') > 0 && e.indexOf('/md5hash/') > 0){
        var urls = e.split('/md5hash/')
        xhr = new XMLHttpRequest();
        xhr.open("GET", urls[0], false);
        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.6) Gecko/20100627 Firefox/3.6.6");
        xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        xhr.setRequestHeader("Accept-Language","en-us,ru;q=0.5");
        xhr.setRequestHeader("Accept-Charset","ISO-8859-1,utf-8;q=0.7,*;q=0.7");
        xhr.setRequestHeader("Referer", 'http://' + urls[1]);
        xhr.send();
        var page = xhr.responseText;
        var tmp = parser(page, '"url":"','",');
        if (tmp != '') { 
            return c = tmp;
        } else {
            return c = e;
        }
    }
    
    if (e.indexOf('.lovekino.tv/video/md5hash') > 0) {
        var page = API.Request('http://s2.lovekino.tv/player/play.php?name=films/klyatva.na.krovi.2010.xvid.iptvrip.filesx.flv');
        var md5hash = parser(page, 'video/','/');
        c = e.replace('md5hash', md5hash);
        return c = Addidation_parser(c);
    }
    
    if (e.indexOf("serialo.ru/video") > 0) {
        var responseText = API.Request('http://latino-serialo.ru/italianskie_seriali_online/2638-polny-ocharovaniya-cheias-de-charme-seriya-10.html');
        var page = API.XHRObj.responseText;
        var hash_list = parser(page, ';pl=', '"');
        var responseText = API.Request(hash_list).replace(/[\n]/g, '');
        var page = API.XHRObj.responseText;
        var tmp = parser(page, 'file":"', '"');
        var md5hash = parser(tmp, '/video/','/');
        var tmp2 = tmp.replace(md5hash, 'md5hash');
        var md4hash = parser(tmp2, '/md5hash/', '/');
        var url2 = e.replace('md5hash', md5hash);
        c = url2.replace('md4hash', md4hash);
        return c = Addidation_parser(c);
    }
    if (e.indexOf("fileplaneta.com") > 0) { //mediapapa
        var b = API.Request(e); //mediapapa
		var id = parser(e, "dd=", "&&")
		var hd = parser(e, "hd=", "&&")
		if(hd == 1){
			var st = parser(b, id, "</track>")
			c = parser(st, "<filehd>", "</filehd>");
		}
		else{
			var str = "<id>" + id + "</id><file>"
			c = parser(b, str, "</file>");
		}
        return c = Addidation_parser(c);
    }
    if (e.indexOf("aburmu4.tv") > 0) { //aburmu4.tv
        var b = API.Request("http://s1.aburmu4.tv/player/play.php?s=1&name=vsfw/antboy_2013.flv"); //aburmu4.tv
        c = e.replace("md5hash", parser(b, "http://50.7.188.234/v/", "/vsfw/antboy_2013.flv")).replace('aburmu4.tv@', '');
        return c = Addidation_parser(c);
    }
	if (e.indexOf("dolgoe.net") > 0) { //aburmu4.tv
        var b = API.Request("http://srv10.dolgoe.net/php/video.php?name=film/tammy.2014.flv"); //aburmu4.tv
        c = e.replace("md5hash", parser(b, "http://srv10.dolgoe.net/video/", "/film/tammy.2014.flv")).replace('aburmu4.tv@', '');
        return c = Addidation_parser(c);
    }
	if (e.indexOf("serverfilm.net") > 0) { //aburmu4.tv
        var b = API.Request("http://srv10.serverfilm.net/php/video.php?name=film/gorod.grehov.2.flv"); //aburmu4.tv
        c = e.replace("md5hash", parser(b, "http://srv10.serverfilm.net/video/", "/film/gorod.grehov.2.flv")).replace('aburmu4.tv@', '');
        return c = Addidation_parser(c);
    }
	/*if (e.indexOf("hdcdn.nl") > 0) { //
        c = e.replace("hdcdn.nl", 'moonwalk.cc');
    }
    if (e.indexOf("serpens.nl") > 0) { //
        c = e.replace("serpens.nl", 'moonwalk.cc');
    }*/
	if (e.indexOf("korolek.tv") > 0) { //aburmu4.tv
        var b = API.Request("http://s1.korolek.tv/player/play.php?name=vsfw/golodni.igry.2014.camrip.flv"); //aburmu4.tv
        c = e.replace("md5hash", parser(b, "http://s1.korolek.tv/v/", "/vsfw/golodni.igry.2014.camrip.flv")).replace('aburmu4.tv@', '');
        return c = Addidation_parser(c);
    }
	if (e.indexOf("online-cinema.biz") > 0) { //cinema-hd.ru
        var b = API.Request(e);
        c = parser(b, '&file=', '"');
        return c = Addidation_parser(c);
    }
	if (e.indexOf(".99/s/md5") > 0 || e.indexOf(".99/hls/md5") > 0) { //kino-live.org
        var b = API.Request("http://kino-live2.org/hq/715505-slova.html"); //kino-live.org
        c = e.replace("md5hash", parser(b, "/s/", "/"));
        return c = Addidation_parser(c);
    }
    if (e.indexOf(".kinoylei.ru") > 0) { //kinoylei.ru
        var b = API.Request("http://server1.kinoylei.ru/get2/3074");
        c = e.replace("md5hash", parser(b, 'film/', '/'));
        return c = Addidation_parser(c);
    }
    if (e.indexOf(".kinoluvr.ru") > 0) { //kinoylei.ru
        var b = API.Request("http://server1.kinoluvr.ru/get2/5291");
        c = e.replace("md5hash", parser(b, 'film/', '/'));
        return c = Addidation_parser(c);
    }
    if (e.indexOf("moviestape.com/") > 0) { //moviestape.com
        var b = API.Request("http://fs0.moviestape.com/show.php?name=films/Charlie.and.the.Chocolate.Factory.mp4");
        c = e.replace("md5hash", parser(b, "http://fs0.moviestape.com/video/", "/films/"));
        return c = Addidation_parser(c);
    }
    if (e.indexOf("poiuytrew.pw/") > 0  && e.indexOf("kino-dom") > 0) { //kino-dom
        var e1 = "http://kino-dom.org/dokumentalnii/1164-elnyy-ulov-1-7-sezony-onlayn.html";
        var responseText = API.Request(e1);
        var page = API.XHRObj.responseText;
        var hash = parser(page, 'pl:"http://kino-dom.org/', '/play/');
        c = e.replace("md5hash", hash);
        var s = parser(c, '_[', '].');
        if (s) {
            var r = s.replace(",","").split(/([0-9])/);
            c = c.replace(s,r[1]+r[3]+r[5]).replace('[','').replace(']','');
            return c = Addidation_parser(c);
        }
    }
    if (e.indexOf("poiuytrew.pw/") > 0  && e.indexOf("linecinema") > 0) { //linecinema
        var e1 = "http://www.linecinema.org/newsz/dokumentalnyij-online/521651-noy-poslednee-vremya-noah-and-the-last-days-2014-webrip.html";
        var responseText = API.Request(e1);
        var page = API.XHRObj.responseText;
        var hash = parser(page, '/linecinema/', '/hd_30/');
        c = e.replace("md5hash", hash);
        var s = parser(c, '_[', '].');
        if (s) {
            var r = s.replace(",","").split(/([0-9])/);
            c = c.replace(s,r[1]+r[3]+r[5]).replace('[','').replace(']','');
            return c = Addidation_parser(c);
        }
    }
    if (e.indexOf("pirateplayer.com/") > 0) { //stepashka.com
        var b = API.Request("http://pirateplayer.com/embed/sPXX6HVcfQV");
        c = e.replace("md5hash", parser(b, 'st=http://pirateplayer.com/player/1-f/Kh5CER87XrjkpQjC19ni3e-Ym3NWhDi0U/', '/embed/"'));
        return c = Addidation_parser(c);
    }
    if (e.indexOf("hotcloud.org/") > 0) { //my-hit.org
        var b = API.Request("https://my-hit.org/film/558/playlist.txt");
        c = e.replace("md5hash", parser(b, 'id=', '"}]}'));
        return c = Addidation_parser(c);
    }
    if (e.indexOf("moviestape.com/") > 0) { //moviestape.com
        var b = API.Request("http://fs0.moviestape.com/show.php?name=films/Captain.Phillips.mp4");
        c = e.replace("md5hash", parser(b, 'http://s*/video/', "/s*/s*mp4'};"))
        return c = Addidation_parser(c);
    }
    if (e.indexOf("baskino.com/films") > 0) { //baskino.com
        var b = API.Request(e);
        c = parser(b, 'file:"', '"');
        return c = Addidation_parser(c);
    }
    if (e.indexOf('kinobar.net') > 0) { //kinobar.net
        var b = API.Request(e);
        c = parser(b, 'src="', '" type=');
        return c = Addidation_parser(c);
    }
    /*if (e.indexOf('serials.tv/') > 0) { //kinobar.net
        var b = API.Request(e);
        c = parser(b, "src: '", "',");
        return c = Addidation_parser(c);
    }*/
    if (e.indexOf('.jampo.tv/play') > 0) { //jampo
        var b = API.Request(e);
        c = parser(b, '<video width="s*?" height="s*?" src="', '" controls />');
        return c = Addidation_parser(c);
    }
    if (e.indexOf('lidertvvv') > 0) { //lidertvt
        var b = API.Request(e.replace('lidertvvv',''));
        c = parser(b, 'file: "', '",');
        return c = Addidation_parser(c);
    }
    if (e.indexOf('/serial') > 0 && e.indexOf('/iframe') > 0) { //moonwalk.cc/serial
        var ref = '';
        if (e.indexOf('@') > 0){
            e = e.split('@')[0];
            ref = '@http://moonwalk.cc';
        }
        var b = API.Request(e);
        e = 'http://moonwalk.cc/video/' + parser(b, "video_token: '", "',") + '/iframe' + ref;
    }
	if (e.indexOf('/iframe') > -1)  { //moonwalk.cc
        var ref = 'http://moonwalk.cc';
        c = 'http://moonwalk.cc/video/' + parser(c, '/video/','/iframe') + '/iframe';
        if (e.indexOf('@') > 0){
            c = 'http://moonwalk.cc/video/' + parser(e.split('@')[0], '/video/','/iframe') + '/iframe';
            ref = e.split('@')[1];
        }
        var xhr = new XMLHttpRequest();
        xhr.open("GET", c, false);
        xhr.setRequestHeader("Connection", "keep-alive");
        xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X; en-us) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B176 Safari/7534.48.3");
        xhr.setRequestHeader("DNT", "1");
        xhr.setRequestHeader("Referer", ref);
        xhr.send(null);
        var page = xhr.responseText;
		var content = "14" + parser(page, '\|14','\|');
		var video_token = parser(page, "video_token: '", "'");
		var content_type = parser(page, "content_type: '","'");
		var access_key = parser(page, "access_key: '", "'");
		var csrftoken = parser(page,'csrf-token" content="','"');
		var pid = parser(page, 'mw_pid: ', ',');
		var did = parser(page, 'mw_did: ', '\n');
		var post = '?mw_pid=' + pid + '&mw_did=' + did + '&video_token=' + encodeURIComponent(video_token) + '&content_type=' + content_type +'&access_key=' + encodeURIComponent(access_key) + '&cd=0';
		var xhr = new XMLHttpRequest();
		xhr.open("POST", 'http://moonwalk.cc/sessions/new_session', false);
		xhr.setRequestHeader("Accept", "*/*");
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
		xhr.setRequestHeader("Encoding-Pool", base64_encode(content));
		xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
		xhr.setRequestHeader("X-CSRF-Token", csrftoken);
		xhr.send(post);
		var response = xhr.responseText;
		var e = parser(response, '"manifest_m3u8":"', '"');
		e = e.replace("\\u0026","&").replace("\\u0026","&");
        var page = API.Request(e);
        var b = page.split(/\n/);
        for (var a = 0; a < b.length; a++) {
            var str = b[a];
            if (str.indexOf('tracks-1') > 0 ) {
                c = b[a];
                break;
            }
        }
        return c;
    }
    
    
    if (e.indexOf('kinoprosmotr.net') > 0){
        var page = API.Request(c);		
        var url3 = parser(page, "Base64.decode('","')");
        var url2 = base64_decode(url3);
        c = parser(url2, 'file=','&');
        return c;
	}		
    if (e.indexOf('kinoprosmotr.org') > 0){
        var page = API.Request('http://s3.kinoprosmotr.org/serialv1.php?fi=Fargo');		
        var url3 = parser(page, 'video/','/Fargo')
        c = c.replace('md5hash', url3);
        return c;
    }
    
    if(e.indexOf('megogo.net/') > 0){
		var contdata = parser(c, 'view/', '-');
		var hash = API.Request('http://cscvod.ru/md5.php?md5=' + encodeURIComponent('video=' + contdata + 'acfed32a68da1d7c'));
		var url = 'http://megogo.net/p/info?video=' + contdata + '&sign=' + hash + '_xbmc';
		xhr = new XMLHttpRequest();
		xhr.open("GET", url, false);
		var useragent = 'xbmc.python.pluginsource/plugin.video.megogo.net ' + encodeURIComponent('MEGOGO.NET') + '/1.0.1/' + encodeURIComponent('MEGOGO.NET'); 
		xhr.setRequestHeader("User-Agent", useragent);
		xhr.send(null);
		response = xhr.responseText;
		var json = JSON.parse(response);
		c = json.src;
		return c;
	}

    if (e.indexOf('serialon.com/') > 0) { //serialon.com/
        var b = API.Request('http://www.serialon.com/serial/10601-agent-osobogo-naznacheniya-4-15-seriya.html');
        c = e.replace("md5hash", parser(b, "'file':'http://www.serialon.com/h-video/", "/agent-osobogo-naznacheniya-4/agent-osobogo-naznacheniya-4_1/agent-osobogo-naznacheniya-4_1.flv'"));
        return c = Addidation_parser(c);
    }
    if (e.indexOf('serialsonline.net/clip') > 0) { //serialsonline.net
        var b = API.Request(e);
        c = parser(b, 'file:"', '"');
        return c = Addidation_parser(c);
    }
    if (e.indexOf('watch-online-hd.ru/') > 0 || c.indexOf('hdgo.cc') > 0) { //watch-online-hd.ru
        var b = API.Request('http://watch-online-hd.ru/embed/54/');
        c = e.replace("md5hash", parser(b, "http://v4.watch-online-hd.ru/flv/", "/54-sdelka-s-dyavolom.mp4"));
        return c = Addidation_parser(c);
    }
    if (e.indexOf('serialsonline.net/clip') > 0) { //serialsonline.net
        var b = API.Request(e);
        c = parser(b, 'file:"', '"');
        return c = Addidation_parser(c);
    }
    if (e.indexOf('onlyclips.net/artist') > 0) { //onlyclips.net
        var b = API.Request(e);
        c = parser(b, '<iframe.*src=".*youtube.com/embed/', '" fr');
        return c = Addidation_parser(c);
    }
    if (e.indexOf('vk.com') > 0) { //vk.com
        var b = API.Request(e);
        c = 'http:' + parser(b, 'iframe.*?src="', '"').replace('http:','');
        return c = Addidation_parser(c);
    }
    if (e.indexOf('/rutube.ru') > 0) { //rutube.ru
        if (c.indexOf('rutube.ru/video') > 0) {
            b = 'http://rutube.ru/api/oembed/?format=json&url=' + c;
            var doc = API.Request(b);
            b = 'http://' + parser(doc, '"//','"');
        } else if (c.indexOf('play/embed') > 0) {
            b = c;
        }
        doc =  API.Request(b);
        c = parser(doc, '&quot;m3u8&quot;: &quot;','&quot;},');
        c = c.replace(/&amp;/g, '&');
		return c = Addidation_parser(c);
	}
    if (e.indexOf('.kinoxa-x.ru') > 0) { //kinoxa-x.ru
        var b = API.Request(e);
        c = parser(b, "file : '","'");
        return c = Addidation_parser(c);
    }
    /*if (e.indexOf('allserials.tv/s/md5') > 0) { //allserials.tv
        var b = API.Request('http://allserials.tv/get.php?action=playlist&pl=Osennie.cvety.2009').replace(/[\r\n]/g, '');
        b = API.Request('http://gegen-abzocke.com/xml/nstrim/allserials/code.php?code_url=') + b;
        c = e.replace("md5hash", b);
        return c = Addidation_parser(c);
    }*/
    if (e.indexOf("kinoprosmotr.net/") > 0) { //kinoprosmotr.net
        var b = API.Request(e).replace(/[\n]/g, '');
        c = parser(b, ";file=", "&amp;poster=");
        return c = Addidation_parser(c);
    }
    if (e.indexOf("kinoprosmotr.org/video/") > 0) { //kinoprosmotr.org
        var b = API.Request("http://kinoprosmotr.net/serial/1839-ne-ver-su-iz-kvartiry-23.html").replace(/[\r\n]/g, '');
        c = e.replace("md5hash", parser(b, "serial.php%3Fip%3D", "%26fi"));
        return c = Addidation_parser(c);
    }
    if (e.indexOf("new-kino.net") > 0) { //new-kino.net
        var b = API.Request("http://new-kino.net/komedii/5631-igrushka-1982.html").replace(/[\r\n]/g, '');
        c = e.replace("md5hash", parser(b, "/dd11/", "/")).replace('?new-kino.net', '');
        return c = Addidation_parser(c);
    }
    if (e.indexOf("uakino") > 0) { //uakino.net
        var b = API.Request(e);
        c = parser(b, 'file":"', '"');
        return c = Addidation_parser(c);
    }
    
    if (e.indexOf("kaban.tv/") > 0) { //kaban.tv
        var b = API.Request(e);
        var d = parser(b, ',"file":"', '","f');
        c = 'http://185.25.119.98/php/kaban/kaban.php?code=' + d;
        return c = Addidation_parser(c);
    }
    
    if (e.indexOf("videoapi.my.mail.ru/") > 0) { //my.mail.ru/
    	e.replace('embed/','').replace('html','json')
        var b = API.Request(e);
        c = parser(b, 'sd":"', '"');
        return c = Addidation_parser(c);
    }
    
    if (e.indexOf("tree.tv") > 0) { //tree.tv
        var b = API.Request(e).replace(/[\n]/g, '');;
        var q = parser(e, '&dd=', '&&');
        var str1 = b.indexOf(q);
        var str2 = b.indexOf('http://', str1);
        var str3 = b.indexOf('http://', str2);
        var str4 = b.indexOf('"', str2);
        c = b.substr(str3, str4 - str3)
        return c
    }
	
    if (e.indexOf("cxz.to") > 0) {        
	c = getFsToVideo(decLongUrl(e));
    } 	
    
///////////////////////////////////////////////////////////////////////////////////////////
    
    //minizal.net
    if (e.indexOf('minizal.net') > 0) {
        var b = API.Request('http://s2.minizal.net/php/playlist.php?pl=/syn_otca_narodov.txt').replace(/[\r\n]/g, '');
        c = e.replace("md5hash", parser(b, "/video/", "/"));
        return c = Addidation_parser(c);
    }
    //minizal.net
        
    //porntube
    if (e.indexOf("porntube.com") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var q = parser(link, '??', '&&');
        var tmp = parser(link, '<stream label="' + q, '</stream>');
        film = parser(tmp, '<file>', '</');
        c = decodeURIComponent(film.replace(/&amp;/g, "&"));
        return c = Addidation_parser(c);
    }

    //streamcloud.eu
    if (e.indexOf("streamcloud.eu") > 0) {
        http2 = new XMLHttpRequest();
        http2.open("GET", e, false);
        http2.send(null);
        sleep(12000);
        var id = parser(e, 'streamcloud.eu/', '/');
        var fname = parser(e, id + '/', '.html');
        var params = "op=download1&usr_login=&id=" + id + "&fname=" + fname + "&referer=&hash=&imhuman=Weiter+zum+Video";
        http = new XMLHttpRequest();
        http.open("POST", e, true);
        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                c = parser(http.responseText, 'file: "', '"');
                return c = Addidation_parser(c);
            }
        }
    }

    // sibnet
    if (e.indexOf("/video.sibnet.ru") > 0) {
        var responseText = API.Request(e);
        Wert = document.cookie;
        Wert = Wert.slice(Wert.indexOf("=") + 1, Wert.length);
        var link = API.XHRObj.responseText;
        var hash = parser(link, "'file':'", "'");
        var e_tmp = "http://video.sibnet.ru" + hash;
        xhr = new XMLHttpRequest();
        xhr.open("GET", e_tmp, false);
        xhr.setRequestHeader("Accept-Encoding", "identity");
        xhr.setRequestHeader("Accept-Language", "en-us,en;q=0.5");
        xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.6) Gecko/20100627 Firefox/3.6.6");
        xhr.setRequestHeader("Accept-Charset", "ISO-8859-1,utf-8;q=0.7,*;q=0.7");
        xhr.setRequestHeader("X-Set-Cookie", "Wert");
        xhr.setRequestHeader('X-Alt-Referer', 'http://video.sibnet.ru/player/player.swf');
        xhr.setRequestHeader('Referer', 'http://video.sibnet.ru/player/player.swf');
        xhr.setRequestHeader("Connection", "close");
        xhr.send();
        responseText = xhr.getAllResponseHeaders(); 
        //return c = parser(responseText, 'Location: ', '&');   
        var e_end = responseText.substr(responseText.indexOf('http://'));
        c = e_end.replace(/^\s+/, '').replace(/\s+$/, '');
        return c = Addidation_parser(c);
    }

    // mult-online
    if (e.indexOf("film-center.info/") > 0) {
        var e1 = "http://srv1.film-center.info/player/play.php?name=flv/full/zavtrak.na.trave.1979.dvdrip.flv";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var hash = parser(link1, '/video/', '/');
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }

    //onlinefilmx
    if ((e.indexOf("onlinefilmx.ru/video") > 0) || (e.indexOf("onlinefilmx.tv/video") > 0)) {
        http = new XMLHttpRequest();
        var e1 = "http://s3.onlinefilmx.ru/player/play.php?id=113";
        http.open("GET", e1, true);
        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                var hash = parser(http.responseText, "/video/", "/");
                c = e.replace("md5hash", hash);
                return c = Addidation_parser(c);
            }
        }
    }

    //tushkan.net
    if (e.indexOf("tushkan.net/video") > 0 || e.indexOf("rugailo.net/video/") > 0) {
        var e1 = API.Request("http://srv3.tushkan.net/php/tushkan.php?name=film/Slova.2012.flv");
        var hash = parser(e1, "/video/", "/film/");
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }


    //tushkan.net film
    if ((e.indexOf("tushkan.net/php") > 0) || (e.indexOf("rugailo.net/php") > 0) || (e.indexOf("videose.org/") > 0)) {
        var http = API.Request(e);
        c = parser(http, "file' : '", "'");
        return c = Addidation_parser(c);
    }

    // uakino
    if (e.indexOf("uakino") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        c = parser(link, 'file":"', '",');
        return c = Addidation_parser(c);
    }

    // latino-serialo
    if (e.indexOf("latino-serialo.ru") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var hash = parser(link, ';pl=', '"');
        var responseText = API.Request(hash);
        var row = API.XHRObj.responseText;
        var string1 = parser(e, '??', 'md5hash');
        var string2 = parser(e, 'md5hash', '&&');
        var video = parser(e, '&&', '#');
        var film = parser(row, "http://" + video, string2);
        c = "http://" + video + film + string1;
        return c = Addidation_parser(c);
    }
    //kset.kz
    if (e.indexOf("kset.kz") > 0) {
        http = new XMLHttpRequest();
        http.open("GET", e, true);
        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                var code = parser(http.responseText, 'ImZpbGUi', '==');
                var code_e = "http://gegen-abzocke.com/xml/nstrim/kset/code.php?code_url=" + code;
                var responseText = API.Request(code_e);
                c = API.XHRObj.responseText;
                return c = Addidation_parser(c);
            }
        }
    }

    if (e.indexOf("#redirect#") != -1) {
        var temp = e.replace("#redirect#", "");
        var responseText = API.Request(temp);
        c = API.XHRObj.responseText;
        return c = Addidation_parser(c);
    }


    // new-kino.net
    if (e.indexOf("new-kino.net") > 0) {
        var e1 = "http://new-kino.net/komedii/5631-igrushka-1982.html";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var hash = parser(link1, '/dd11/', '/');
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    // filmin
    if (e.indexOf(".tfilm.tv/") > 0) {
        var e1 = "http://filmin.ru/28234-buket.html";
        var responseText = API.Request(e1);
        var link = API.XHRObj.responseText;
        var code = parser(link, ';file=', '&');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/filmin/code.php?code_url=" + code;
        var responseText = API.Request(code_e);
        var hash = API.XHRObj.responseText;
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    // baskino.com
    if (e.indexOf("baskino.com/") > 0) {
        var string = parser(e, '??', '&&');
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var link2 = link.substr(link.indexOf(string) - 150, 150)
        link2 = link2.replace(/\\/gi, "");
        link2 = link2 + string + '"';
        c = parser(link2, 'file:"', '"');
        return c = Addidation_parser(c);
    }

    // kinobanda
    if (e.indexOf("kinobanda.net/") > 0) {
        var e1 = "http://kinobanda.net/get.php?pl=23298/1/0/";
        var responseText = API.Request(e1);
        var code = API.XHRObj.responseText;
        var code_e = "http://gegen-abzocke.com/xml/nstrim/kinobanda/code.php?code_url=" + code;
        var responseText = API.Request(code_e);
        var hash = API.XHRObj.responseText;
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    //

    //veterok
    if (e.indexOf("veterok.tv/v/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        c = parser(link, '"]="', '";');
        return c = Addidation_parser(c);
    }

    //imovies.ge
    if (e.indexOf("imovies.ge/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        c = parser(link, "file>", "<");
        return c = Addidation_parser(c);
    }

    // kino-live.org
    if (e.indexOf("kino-live.org/s/md5") > 0) {
        var e1 = "http://kino-live.org/hq/715505-slova.html";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var hash = parser(link1, '/s/', '/');
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }

    if (e.indexOf("embed.nowvideo.eu/") > 0) {
        var responseText = API.Request(e);
        var link1 = API.XHRObj.responseText;
        var film = parser(link1, 'flashvars.file="', '";');
        var filekey = parser(link1, 'flashvars.filekey="', '";');
        var xml_e = "http://www.nowvideo.eu/api/player.api.php?user=undefined&codes=1&key=" + filekey + "&pass=undefined&file=" + film;
        var responseText = API.Request(xml_e);
        var txtDoc = API.XHRObj.responseText;
        var link = parser(txtDoc, 'http', '&title');
        c = "http" + link;
        return c = Addidation_parser(c);
    }

    //mult-online
    if (e.indexOf("videose.org/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        c = parser(link, "file : '", "'");
        return c = Addidation_parser(c);
    }

    // namba
    if (e.indexOf("namba.net/") > 0) {
        var id = parser(e, 'video/', '/');
        var responseText = API.Request(e);
        var tk = API.XHRObj.responseText;
        var token = parser(tk, "CSRF_TOKEN='", "'");
        var e1 = "http://namba.net/api/?service=video&action=video&token=" + token + "&id=" + id;
        var responseText = API.Request(e1);
        var link = API.XHRObj.responseText;
        var film = parser(link, 'flv":"', '"');
        c = film.replace(/\\/gi, "");
        return c = Addidation_parser(c);
    }

    //jampo
    if (e.indexOf("jampo.") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        c = parser(link, "flashvars.File = '", "'");
        return c = Addidation_parser(c);
    }
    
    //online.ua/
    if (e.indexOf("online.ua/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var e1 = parser(link, "file: 'http://video.online.ua/playlist/", "'");
        var e1 = "http://video.online.ua/playlist/" + e1;
        var responseText = API.Request(e1);
        var link = API.XHRObj.responseText;
        c = parser(link, "<location>", "<");
        return c = Addidation_parser(c);
    }

    //bonustv 
    if ((e.indexOf("mediacdn.ru") > 0)) {
        xhr = new XMLHttpRequest();
        var event = e.match(/event=(\d+)/);
        xhr.open("GET", 'http://app1.bonus-tv.ru/api/channels', false);
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Host", "app.bonus-tv.ru");
        xhr.setRequestHeader("Referer", "http://bonus-tv.ru:90/lg/publish/");
        xhr.setRequestHeader("X_USERNAME", "c3d33d76a835a59ff32bb65e77dfa45c");
        xhr.setRequestHeader("X_PASSWORD", "c3d33d76a835a59ff32bb65e77dfa45c");
        xhr.send();
        var responseText = xhr.responseText;
        var filter = new RegExp('event=' + event[1] + '&hash=(.*?)"');
        var hash = responseText.match(filter);
        c = e + hash[1];
        return c = Addidation_parser(c);

    }

    //debilizator.tv
    if ((e.indexOf("debilizator.tv") > 0)) {
        var responseText = API.Request(e);
        responseText = API.XHRObj.responseText;
        c = parser(responseText, '<source src="', '" type="video/mp4"');
        return c = Addidation_parser(c);

    }

    //kinoxa-x
    if (e.indexOf(".kinoxa-x.ru") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        c = parser(link, "file : '", "'");
        return c = Addidation_parser(c);
    }


    // stepashka
    if (e.indexOf("stepashka.com/video/") > 0){
        var e1 = "http://online.stepashka.com/filmy/deutsch/19600-the-incident-asylum-blackout-2011-deutsch.html";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var code = parser(link1, '&file=', '"');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/stepashka/code.php?code_url=" + code;
        var responseText = API.Request(code_e);
        var hash = API.XHRObj.responseText;
        var md5 = parser(hash, '/video/', '/');
        c = e.replace("md5hash", md5);
        return c = Addidation_parser(c);
    }

    // kinostok(vseriale)
    if ((e.indexOf("//kinostok.tv/player/") > 0) || (e.indexOf("//kinostok.tv/embed") > 0)) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var code = "http://gegen-abzocke.com/xml/nstrim/kinostok/code.php?code_url=" + link;
        var responseText = API.Request(code);
        var e_end = API.XHRObj.responseText;
        c = parser(e_end, 'file":"', '"');
        return c = Addidation_parser(c);
    }

    // mail.ru(vseriale)
    if (e.indexOf("api.video.mail.ru/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        if (link.indexOf('hd":"') > 0){
            c = parser(link, 'hd":"', '"');
            return c = Addidation_parser(c);
        } else {
            c = parser(link, 'sd":"', '"');
            return c = Addidation_parser(c);
        }
    }
    //mail.ru

    // novamov parser
    if (e.indexOf("novamov.com/embed") > 0) {
        var responseText = API.Request(e);
        var link1 = API.XHRObj.responseText;
        var film = parser(link1, 'flashvars.file="', '";');
        var filekey = parser(link1, 'flashvars.filekey="', '";');
        var xml_e = "http://www.novamov.com/api/player.api.php?pass=undefined&user=undefined&key=" + filekey + "&codes=undefined&file=" + film;
        var responseText = API.Request(xml_e);
        var txtDoc = API.XHRObj.responseText;
        var link = parser(txtDoc, 'http', '&title');
        c = "http" + link;
        return c = Addidation_parser(c);
    }

    // videoweed parser
    if ((e.indexOf("videoweed.es/file") > 0) || (e.indexOf("videoweed.es/embed") > 0)) {
        var responseText = API.Request(e);
        var link1 = API.XHRObj.responseText;
        var film = parser(link1, 'flashvars.file="', '";');
        var filekey = parser(link1, 'flashvars.filekey="', '";');
        var xml_e = "http://www.videoweed.es/api/player.api.php?user=undefined&codes=1&key=" + filekey + "&pass=undefined&file=" + film;
        var responseText = API.Request(xml_e);
        var txtDoc = API.XHRObj.responseText;
        var link = parser(txtDoc, 'http', '&title');
        c = "http" + link;
        return c = Addidation_parser(c);
    }

    // kino-v-online.ru parser
    if ((e.indexOf("//kino-v-online.tv/kino/md5") > 0) || (e.indexOf("//kino-v-online.tv/serial/md5") > 0) || (e.indexOf("?st=1") > 0)) {
        var e1 = "http://kino-v-online.tv/2796-materik-online-film.html";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var hash = parser(link1, '/kino/', '/');
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    // kinoprosmotr.net
    if (e.indexOf("kinoprosmotr.net/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var hash = parser(link, ';file=', '.flv');
        hash = hash.replace(/\n/, "");
        c = hash + ".flv"
        return c = Addidation_parser(c);
    }
    //kinoprosmotr.net
    // kinoprosmotr.net ser
    if (e.indexOf("kinoprosmotr.org/video/") > 0) {
        var e1 = "http://kinoprosmotr.net/serial/1839-ne-ver-su-iz-kvartiry-23.html";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var hash = parser(link1, 'serial.php%3Fip%3D', '%26fi');
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }

    // vtraxe
    if (e.indexOf("//vtraxe.com/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var code = parser(link, '3Fv=', '&');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/uletno/code.php?code_url=" + code;
        var responseText = API.Request(code_e);
        c = API.XHRObj.responseText;
        return c = Addidation_parser(c);
    }
    //vtraxe

    // linecinema parser
    if (e.indexOf("linecinema.org/s/md5") > 0) {
        var e1 = "http://www.linecinema.org/newsz/boevyk-online/508954-bliznecy-drakony-twin-dragons-1992-dvdrip-onlayn.html";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var hash = parser(link1, 'linecinema.org/s/', '/');
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    // go2load
    if (e.indexOf("//figvam.ru/") > 0) {
        e = e.replace("figvam.ru", "go2load.com");
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var hash = parser(link, 'ftp://', '"');
        c = "http://" + hash
        return c = Addidation_parser(c);
    }
    //go2load
    // fepcom
    if (e.indexOf(".igru-film.net/") > 0) {
        var e_row = parser(e, 'xyss', 'xys');
        var e_film = "http://fepcom.net/" + e_row;
        var film = parser(e, 'ssa', 'xyss');
        var responseText = API.Request(e_film);
        var link = API.XHRObj.responseText;
        var film_row = parser(link, ';file=', '&');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/fepcom/code.php?code_url=" + film_row;
        var responseText = API.Request(code_e);
        var code = API.XHRObj.responseText;
        c = film.replace("md5hash", code);
        return c = Addidation_parser(c);
    }
    //fepcom	

    // kinoylei
    if (e.indexOf("kinoylei.ru/") > 0) {
        var e1 = " http://server1.kinoylei.ru/player/pl.php?id=2902-3142";
        var responseText = API.Request(e1);
        var link = API.XHRObj.responseText;
        var hash = parser(link, 'video/', '/');
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    // kinoylei

    // nowfilms
    if ((e.indexOf("//77.120.114") > 0) || (e.indexOf("nowfilms.ru/") > 0)) {
        var e_row = parser(e, 'xyss', 'xys'); 
        var e_film = "http://" + e_row;
        var film = parser(e, 'ssa', 'xyss');
        var film_end = parser(e, '/md5hash/', 'xys');
        var responseText = API.Request(e_film);
        var link = API.XHRObj.responseText;
        var film_row = parser(link, ';pl=', '"');
        if (film_row.indexOf("/tmp/") > 0) {
            var responseText = API.Request(film_row);
            var link = API.XHRObj.responseText;
            if (link.indexOf(film_end) > 0) {
                var md = link.indexOf(film_end)
                md5hash = link.substr(link.indexOf(film_end) - 23, 22)
                c = film.replace("md5hash", md5hash);
            }
        } else {
            var film_row = parser(link, ';file=', '"');
            c = film_row;
        }
        return c = Addidation_parser(c);
    }
    //nowfilms	 

    //liveonline
    if (e.indexOf("//77.120.119") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var code = parser(link, 'file":"', '"');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/liveonline/code.php?code_url=" + code;
        var responseText = API.Request(code_e);
        c = API.XHRObj.responseText;
        return c = Addidation_parser(c);
    }
    //liveonline

    //uletno
    if (e.indexOf("uletfilm.net/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var code = parser(link, 'file":"', '"');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/uletno/code.php?code_url=" + code;
        var responseText = API.Request(code_e);
        c = API.XHRObj.responseText;
        return c = Addidation_parser(c);
    }
    // kinostok
    if (e.indexOf("//kinostok.tv/video/") > 0) {
        var responseText = API.Request(e);
        var link = API.XHRObj.responseText;
        var hash = parser(link, 'file: "', '"');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/kinostok/code.php?code_url=" + hash;
        var responseText = API.Request(code_e);
        c = API.XHRObj.responseText;
        return c = Addidation_parser(c);
    }
    //kinostok

    // inatgeo (yandex)
    if (e.indexOf("/streaming.video.") > 0) {
        var id = parser(e, 'get-location/', '/m');
        var e1 = "http://static.video.yandex.ru/get-token/" + id + "?nc=0.50940609164536";
        var responseText = API.Request(e1);
        var link = API.XHRObj.responseText;
        var hash = parser(link, 'token>', '</token>');
        var link1 = e.replace("md5hash", hash);
        var responseText = API.Request(link1);
        var row = API.XHRObj.responseText;
        var film = parser(row, 'video-location>', '</video-location>');
        c = film.replace("&amp;", "&");
        return c = Addidation_parser(c);
    }
    //inatgeo (yandex)



    // filmix
    if ((e.indexOf("filmix.net/s/md5hash") > 0) || (e.indexOf("filevideosvc.org/s/md5hash") > 0)) {
        var e1 = "http://filmix.net/semejnyj/36974-tor-legenda-vikingov-legends-of-valhalla-thor-2011.html";
        var responseText = API.Request(e1);
        var link = API.XHRObj.responseText;
        var code = parser(link, ';file=', '"');
        if (code.indexOf('&') > 0){
            code = code.substr(0, code.indexOf('&'))
        }
        var code_e = "http://gegen-abzocke.com/xml/nstrim/filmix/code.php?code_url=" + code;
        var responseText = API.Request(code_e);
        var hash = API.XHRObj.responseText;
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    // filmix
    if (e.indexOf("goshatube.com/watch?v=") > 0) {
        var s = e.replace("goshatube", "youtube");
        xhr = new XMLHttpRequest();
        xhr.open("GET", s, false);
        xhr.setRequestHeader("Accept-Encoding", "identity");
        xhr.setRequestHeader("Accept-Language", "en-us,en;q=0.5");
        xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.6) Gecko/20100627 Firefox/3.6.6");
        xhr.setRequestHeader("Accept-Charset", "ISO-8859-1,utf-8;q=0.7,*;q=0.7");
        xhr.setRequestHeader("Connection", "close");
        xhr.send();
        var link = xhr.responseText;
        var host = parser(link, 'crossdomain.xml");yt.preload.start("', '");</script>');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/youtube/test.php?host=" + host;
        var responseText = API.Request(code_e);
        var e_end = API.XHRObj.responseText;
        c = e_end.replace(/^\s+/, '').replace(/\s+$/, '');
        return c = Addidation_parser(c);
    }
    // bugfix onlyfilms
    if (e.indexOf("/streaming2.video.") > 0) {
        var link1 = e.replace("/streaming2", "/streaming");
        c = link1;
        return c = Addidation_parser(c);
    }
    // bugfix onlyfilms

    //bigcinema
    if (e.indexOf("bigcinema.tv") > 0) {
        http = new XMLHttpRequest();
        var e1 = "http://bigcinema.tv/movie/voyna-mirovz-world-warz.html";
        http.open("GET", e1, true);
        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {
                var code = parser(http.responseText, 'file:"', '"');
                var code_e = "http://gegen-abzocke.com/xml/nstrim/bigcinema/code.php?code_url=" + code;
                var responseText = API.Request(code_e);
                var hash = API.XHRObj.responseText;
                c = e.replace("md5hash", hash);
                return c = Addidation_parser(c);
            }
        }
    }
    //bigcinema
    // allserials parser
    if (e.indexOf("allserials.tv/s/md5") > 0 || e.indexOf("duvideo.net/s/md5") > 0) {
        var e1 = "http://allserials.tv/get.php?action=playlist&pl=Osennie.cvety.2009";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var code_e = "http://gegen-abzocke.com/xml/nstrim/allserials/code.php?code_url=" + link1;
        var responseText = API.Request(code_e);
        var hash = API.XHRObj.responseText;
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    // kinopod parser
    if ((e.indexOf("kinopod.org/get/md5") > 0) || (e.indexOf("flvstorage.com/get/md5") > 0)) {
        var e1 = "http://kinopod.tv/serials/episode/38967.html";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var hash = parser(link1, '/get/', '/');
        c = e.replace("md5hash", hash);
        return c = Addidation_parser(c);
    }
    // kinopod parser
    // allinspace.com
    if (e.indexOf("allinspace.com/") > 0) {
        var e_row = parser(e, '&', '&&');
        var responseText = API.Request(e_row);
        var e1 = parser(e, 'ttp://', '&');
        c = "http://" + e1;
        return c = Addidation_parser(c);
    }
    // seasonvar
    if (e.indexOf(".datalock.ru/") > 0){
        var e1 = "http://newseriya.ru/serial-3151-Kak_ya_vstretil_vashu_mamu-7-season.html";
        var responseText = API.Request(e1);
        var link1 = API.XHRObj.responseText;
        var code = parser(link1, '"pl":"', '"');
        var code_e = "http://gegen-abzocke.com/xml/nstrim/seasonvar/code.php?code_url=" + code;
        var responseText = API.Request(code_e);
        var md5 = API.XHRObj.responseText;
        //var md5= parser(hash, 'playlist/', '/');
        c = e.replace("md5hash", md5);
        return c = Addidation_parser(c);
    }
    // seasonvar

    //zaycev.net
    if ((e.indexOf("zaycev.net") > 0)) {
        var responseText = API.Request(e);
        responseText = API.XHRObj.responseText;
        var regex = parser(responseText, 'encodeURIComponent("/mini.php?id=', '&');
        var regex2 = parser(responseText, 'encodeURIComponent("/mini.php?id=', ';');
        regex2 = parser(regex2, '&ass=', '"');
        var regex3 = parser(responseText, 'encodeURIComponent("/mini.php?id=', '&');
        regex3 = regex3.substr(0, regex3.length - 2);
        c = "http://dl.zaycev.net/mini/" + regex3 + "/" + regex + "/" + regex2 + ".mp3";
        return c = Addidation_parser(c);
    }
    if ((e.indexOf("dailymotion.com") > 0)) {
        var responseText = API.Request(e);
        var responseText = API.XHRObj.responseText;
        var regex = parser(responseText, 'stream_h264_e":"', '"');
        c = regex.replace(/\\/g, "");
        return c = Addidation_parser(c);
    }
    if ((e.indexOf("mp333.do.am") > 0)) {
        var responseText = API.Request(e);
        responseText = API.XHRObj.responseText;
        var regex = parser(responseText, 'var link1 = "', '"');
        var s = regex.replace("?lang=", "");
        c = s.replace("&id=", "/");
        return c = Addidation_parser(c);
    }
    if ((e.indexOf("hubu.ru") > 0)) {
        var responseText = API.Request(e);
        var responseText = API.XHRObj.responseText;
        c = parser(responseText, ',\'', '\'');
        return c = Addidation_parser(c);
    }
    if ((e.indexOf("loveradio.ru") > 0)) {
        var responseText = API.Request(e);
        responseText = API.XHRObj.responseText;
        var regex = parser(responseText, "{uid: '", "'");
        var regex2 = parser(responseText, "icons/", ".png");
        if (regex2 == 'loveradio' || regex2 == 'top40' || regex2 == 'jlo') {
            regex2 = regex2;
        } else {
            regex2 = 'love_' + regex2;
        }
        c = 'http://stream2.loveradio.ru:9000/' + regex2 + '_64?type=.flv&UID=' + regex;
        return c = Addidation_parser(c);
    }
    if ((e.indexOf("87.239.31") > 0)) {
        var e1 = "http://www.inetcom.tv/channel/russia_1";
        xhr = new XMLHttpRequest();
        xhr.setRequestHeader("Accept-Encoding", "identity");
        xhr.setRequestHeader("Accept-Language", "en-us,en;q=0.5");
        xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
        xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.6) Gecko/20100627 Firefox/3.6.6");
        xhr.setRequestHeader("Accept-Charset", "ISO-8859-1,utf-8;q=0.7,*;q=0.7");
        xhr.setRequestHeader("Connection", "close");
        xhr.send();
        var responseText = xhr.responseText;
        var regex = parser(responseText, "?sid=", "'");
        c = e + '?sid=' + regex;
        return c = Addidation_parser(c);
    }
    if ((e.indexOf("77.91.77") > 0)) {
        var e1 = "http://inetcom.tv/videorec/lookChannel?ch_id=13";
        xhr = new XMLHttpRequest();
        xhr.setRequestHeader("User-Agent", "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.1.4322)");
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        xhr.setRequestHeader("Host", "inetcom.tv");
        xhr.setRequestHeader("Referer", "http://inetcom.tv/channel/pervyi");
        xhr.send();
        var responseText = xhr.responseText;
        var regex = parser(responseText, '?sid=', '"');
        c = e + '?sid=' + regex;
        return c = Addidation_parser(c);
        
    }

    if ((e.indexOf("hubu.ru") > 0)) {
    	console.log('result = ' + "hubu.ru")
        var responseText = API.Request(e);
        var responseText = API.XHRObj.responseText;
        var regex = parser(responseText, ',\'', '\'');
        c = 'http://hubu.ru' + regex;
        return c = Addidation_parser(c);
    }


    //www.sinemaizle.org
    if (e.indexOf('sinemaizle.org/webscripti.php?git=') > 0) {
        var e_to_get_hash = 'http://www.sinemaizle.org/the-help-2012-duygularin-rengi-full-turkce-dublaj-izle.html';
        var responseText = API.Request(e_to_get_hash);
        var link = API.XHRObj.responseText;
        var hash_help = parser(link, '?file=http:', 'image');
        var hash = parser(hash_help, '_', '&');
        c = e + '_' + hash;
        return c = Addidation_parser(c)
    }

    //vk youtube magic
    if (e.indexOf('watchcinema.ru') > 0) {
        var responseText = API.Request(e);
        var page = API.XHRObj.responseText;
        var e2 = parser(page, '<iframe src="', '"');
        e2 = e2.replace("&amp;", "&");
        e2 = e2.replace("//watchcinema.ru/", "//vk.com/");
        if (e2){
            return c = getVkUrl(e2);
            API.Request(e2);
            var txtDoc = API.XHRObj.responseText;
            var id = parser(txtDoc, 'src="http://www.youtube.com/embed/', '?');
            if(id) {
                return c = getYoutubeUrl(id);
            }
        }	  	
    }
    return c
};

Addidation_parser = function(e) {
    var c = e
    if (e.indexOf("vk.com") > 0 || e.indexOf("vk.com/video_ext.php?") > 0 || e.indexOf("/vkontakte.php?video") > 0 || e.indexOf("vkontakte.ru/video_ext.php") > 0 || e.indexOf("/vkontakte/vk_kinohranilishe.php?id=") > 0){
      	c = getVkUrl(e)
    } else {
        if (e.indexOf("youtube.com/watch?v=") > 0) {
            var i = e.substr(e.indexOf("=") + 1);
            c = lrdPr(getYoutubeUrl(i))
        } else {
            if (e.indexOf("youtube.com/embed") >= 0) {
                var d = e.substr(e.indexOf("embed/") + 6);
                c = getYoutubeUrl(d)
            }
        }
    }
    return c
}

i911_to = function(e) {
    var c = e
    xhr = new XMLHttpRequest();
    xhr.open("GET", 'http://911.to/ajax/get_player/482', false);
    xhr.setRequestHeader("Host", "911.to");
    xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 5.1; ru; rv:1.9.2.13) Gecko/20101203 Firefox/3.6.13");
    xhr.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
    xhr.setRequestHeader("Accept-Language","ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3");
    xhr.setRequestHeader("Accept-Charset","windows-1251,utf-8;q=0.7,*;q=0.7");
    xhr.setRequestHeader("Keep-Alive","115");
    xhr.setRequestHeader("Connection","keep-alive");
    xhr.setRequestHeader("Cache-Control","max-age=0");
    xhr.setRequestHeader("Referer", "http%3A%2F%2F911.to%2Fajax%2Fget_player%2F482");
    xhr.send();
    response = xhr.responseText;
    var md5 = parser(response, 'http://911.to/get_cv/','/482')
    c = e.replace('md5', md5)
    return c
}


hdrezka_film = function(e) {
    var c = e
    if (e.indexOf('@') > 0) {
        e = e.split('@')[1];
    }
    var responseText = API.Request(e);
    var page = API.XHRObj.responseText
    var code = parser(page, 'name="post_id" id="post_id" value="', '" />');
    code = 'id=' + code;
    var url2 = 'http://hdrezka.tv/engine/ajax/getvideo.php';
    xhr = new XMLHttpRequest();
    xhr.open("POST", url2, false);
    xhr.setRequestHeader("Accept", "text/plain, */*; q=0.01");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.setRequestHeader("Host", "hdrezka.tv");
    xhr.setRequestHeader("Referer", e);
    xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:27.0) Gecko/20100101 Firefox/27.0");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(code);
    response = xhr.responseText;//.replace(/(\\|[\\])/g, '');
    c = jsonparser(response, 'link', 'mp4');
    return c
}

hdrezka_serial = function(e) {
    var c = e
    if (e.indexOf('@') > 0) {
        e = e.split('@')[1];
    }
    var responseText = API.Request(e);
    var page = API.XHRObj.responseText
    var code = parser(page, 'name="post_id" id="post_id" value="', '" />');
    code = 'id=' + code;
    var url2 = 'http://hdrezka.tv/engine/ajax/getvideo.php';
    xhr = new XMLHttpRequest();
    xhr.open("POST", url2, false);
    xhr.setRequestHeader("Accept", "text/plain, */*; q=0.01");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.setRequestHeader("Host", "hdrezka.tv");
    xhr.setRequestHeader("Referer", e);
    xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:27.0) Gecko/20100101 Firefox/27.0");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send(code);
    response = xhr.responseText;//.replace(/(\\|[\\])/g, '');
    c = jsonparser(response, 'link', 'mp4');
    return c
}

hdrezka_gid = function(e) {
    var c = e;
    if (e.indexOf('@') > 0) {
        e = e.split('@')[1];
    }
    var responseText = API.Request(e);
    var page = API.XHRObj.responseText;
    c = parser(page, "setFlash('", ' ').replace('/manifest.f4m', '');
    return c 
}

jsonparser = function(a, b, c) {
    try {
        JSON.parse(a, function (k, v) {
    	    if (k === b){
    	        data = v;
    	        try {
    	            JSON.parse(data, function (z, x) {
    	                if (z === c) {
    	                    s = x;
    	                }
    	            });
    	        } catch (c) {s = data.split('src="')[1].split('"')[0]}
    	    }
         });
     } catch (c) {s = ''}
     return s
}

function getFsToVideo(url) {
    var urlBrb = url.replace('cxz.to', 'brb.to');
    var response = API.Request(urlBrb);
    var video_url;
    if (response != undefined) {
        response = response.split('is_first: 1,');
        video_url = response[1].match(/download_url: '(.*?)',/);
        video_url = 'http://brb.to' + video_url[1];
    } else {
        response = API.Request(url);
        response = response.split('is_first: 1,');
        video_url = response[1].match(/download_url: '(.*?)',/);
        video_url = 'http://cxz.to' + video_url[1];
    }
    return video_url;
}

