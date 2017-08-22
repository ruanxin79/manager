class Utils {

	/**
	 * [getQueryString 获取浏览器参数]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	static getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");

        var r = window.location.search.substr(1).match(reg);

        if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && r != null) {
            return unescape(unescape(r[2]));
        }
        if (r != null) return unescape(r[2]);
        return "";
	}

    /**
     * [showLoading 显示Loading]
     * @return {[type]} [description]
     */
    static showLoading() {
        let _tmp = `<div class="bg-shadow"></div>
    <div class="bg-loading sui-loading loading-dark loading-inline"><i class="sui-icon icon-pc-loading"></i></div>`;
        $('body').append(_tmp);
    }

    /**
     * [hideLoading 隐藏Loading]
     * @return {[type]} [description]
     */
    static hideLoading() {
        $('.bg-shadow,.bg-loading').remove();
    }

    /**
     * [addMonth 加减月份]
     * @param {[type]} date   [当前日期对象]
     * @param {[type]} months [加减月份]
     */
    static addMonth(date, months) {
        date.setMonth(date.getMonth() + months);
        return `${date.getFullYear()}-${Utils.getZero(date.getMonth() + 1)}-${Utils.getZero(date.getDate())}`;
    }

    /**
     * [getDate 获取当前年月日]
     * @return {[type]} [description]
     */
    static getDate() {
        let nowDate = new Date();
        return `${nowDate.getFullYear()}-${Utils.getZero(nowDate.getMonth() + 1)}-${Utils.getZero(nowDate.getDate())}`;
    }

    static getZero(m) {
        let _m = m;
        if(m < 10) {
            _m = '0' + m;
        }

        return _m;
    }

    /*
     * DateFormat
     * format YYYY/yyyy/YY/yy year
     * MM/M month
     * dd/DD/d/D day
     * hh/HH/h/H hour
     * mm/m minute
     * ss/SS/s/S second
     */
    static formatDate(date, formatStr) {

        if (formatStr == null) return null;

        var str = formatStr;
        var Week = ['日', '一', '二', '三', '四', '五', '六'];
        var month = date.getMonth() + 1;

        str = str.replace(/yyyy|YYYY/, date.getFullYear());
        str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));


        str = str.replace(/MM/, month > 9 ? month : '0' + month);
        str = str.replace(/M/g, month);

        str = str.replace(/w|W/g, Week[date.getDay()]);

        str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
        str = str.replace(/d|D/g, date.getDate());

        str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
        str = str.replace(/h|H/g, date.getHours());
        str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
        str = str.replace(/m/g, date.getMinutes());

        str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
        str = str.replace(/s|S/g, date.getSeconds());

        str = str.replace(/t/g, date.getHours() < 12 ? 'am' : 'pm');
        str = str.replace(/T/g, date.getHours() < 12 ? 'AM' : 'PM');

        return str;
    };
}

class ImageUtils {

    constructor(imageObj) {
        this.image = {};
        this.targetImage = imageObj;
    }

    // 读取图片
    loadFile(event, zoom) {
        var file = event.target.files[0];
        let _canvas = document.createElement('canvas'),
            _context = _canvas.getContext('2d');

        // 判断是否是图片
        var _fileName = event.target.value.split('.')[1];
        this.fileName = event.target.value;
        this.fileType = `.${_fileName}`;
        this.image = file;
        this.size = file.size;
        this.error = '';

        Utils.showLoading();
        let promise = new Promise((resolve, reject) => {
            if (_fileName) {
                if (_fileName.toLowerCase() !== 'jpg' && _fileName.toLowerCase() !== 'jpeg' && _fileName.toLowerCase() !== 'png' && _fileName.toLowerCase() !== 'gif') {
                    this.error = '文件格式仅支付jpg、png和gif格式';
                    reject(this);
                }
            }

            // 读取文件流
            if (window.FileReader) {
                var reader = new FileReader();
                let that = this;
                reader.onloadend = function(e) {

                    if(zoom) {
                        // 缩放到一定的程度
                        _canvas.height = zoom.height;
                        _canvas.width = zoom.width;
                        var _tmpImg = new Image();
                        _tmpImg.src = e.target.result;

                        _tmpImg.onload = function() {
                            _context.drawImage(_tmpImg, 0, 0, zoom.width, zoom.height);
                            let _src = _canvas.toDataURL(`image/${that.fileType.substr(1)}`, 1);
                            Utils.hideLoading();
                            that.targetImage.src = _src;
                            that.src = _src;

                            resolve(that);
                        }
                    } else {
                        Utils.hideLoading();
                        that.targetImage.src = e.target.result;
                        that.src = e.target.result;

                        resolve(that);
                    }
                };
                reader.readAsDataURL(file);
            } else {
                reject({error: '该浏览器不支持文件流，请使用chrome浏览器打开'})
            }
        });

        return promise;

    }

}

export {ImageUtils};
export default Utils;