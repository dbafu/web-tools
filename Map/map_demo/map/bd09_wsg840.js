
var pi = 3.1415926535897932384626;
var a = 6378245.0;
var ee = 0.00669342162296594323;

function bd09_to_gcj02(bd_lon, bd_lat) {
		var gps = {};
    var x = bd_lon - 0.0065, y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * pi);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * pi);
    var gcj_lon = z * Math.cos(theta);
    var gcj_lat = z * Math.sin(theta);
    gps.gcj_lon = gcj_lon;
    gps.gcj_lat = gcj_lat;
    return gps;
}

function gcj02_to_wgs84(lon, lat) {
		var wgs84_gps = {};
    var gps = transform(lat, lon);
    var lontitude = lon * 2 - gps.lon;
    var latitude = lat * 2 - gps.lat;
    wgs84_gps.lon = lontitude;
    wgs84_gps.lat = latitude;

    return wgs84_gps;
}

function bd09_to_wgs84(bd_lon, bd_lat){
	var gcj02_gps = bd09_to_gcj02(bd_lon, bd_lat);
	var gps = gcj02_to_wgs84(gcj02_gps.gcj_lon, gcj02_gps.gcj_lat);
	return gps;
}

function outOfChina(lon, lat) {
  if (lon < 72.004 || lon > 137.8347)
      return true;
  if (lat < 0.8293 || lat > 55.8271)
      return true;
  return false;
}

function transform(lon, lat) {
		var gps = {};
    if (outOfChina(lon, lat)) {
    	gps.lon = lon;
    	gps.lat = lat;
      return gps;
    }
    var dLat = transformLat(lon - 105.0, lat - 35.0);
    var dLon = transformLon(lon - 105.0, lat - 35.0);
    var radLat = lat / 180.0 * pi;
    var magic = Math.sin(radLat);
    magic = 1 - ee * magic * magic;
    var sqrtMagic = Math.sqrt(magic);
    dLat = (dLat * 180.0) / ((a * (1 - ee)) / (magic * sqrtMagic) * pi);
    dLon = (dLon * 180.0) / (a / sqrtMagic * Math.cos(radLat) * pi);
    var mgLat = lat + dLat;
    var mgLon = lon + dLon;
    gps.lon = mgLon;
  	gps.lat = mgLat;
    return gps;
}

function transformLat(x, y) {
    var ret = -100.0 + 2.0 * x + 3.0 * y + 0.2 * y * y + 0.1 * x * y
            + 0.2 * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(y * pi) + 40.0 * Math.sin(y / 3.0 * pi)) * 2.0 / 3.0;
    ret += (160.0 * Math.sin(y / 12.0 * pi) + 320 * Math.sin(y * pi / 30.0)) * 2.0 / 3.0;
    return ret;
}

function transformLon(x, y) {
    var ret = 300.0 + x + 2.0 * y + 0.1 * x * x + 0.1 * x * y + 0.1
            * Math.sqrt(Math.abs(x));
    ret += (20.0 * Math.sin(6.0 * x * pi) + 20.0 * Math.sin(2.0 * x * pi)) * 2.0 / 3.0;
    ret += (20.0 * Math.sin(x * pi) + 40.0 * Math.sin(x / 3.0 * pi)) * 2.0 / 3.0;
    ret += (150.0 * Math.sin(x / 12.0 * pi) + 300.0 * Math.sin(x / 30.0
            * pi)) * 2.0 / 3.0;
    return ret;
}
