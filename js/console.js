/**
 * LOG插件
 */
(function($){

    var log = function(){
        var _log = Array.prototype.slice.call(arguments).map(escapeLog).join(',');
        appendDebugInfo(_log);
        console.log(arguments)
    };

    var opt = {
        enable:true
    };


    /**
     * 转码 格式化特殊字符
     * @param str
     * @returns {replace|*|XML|string|hljs.LANGUAGES.sql.k.keyword.replace|void}
     */
    var escapeHTML = function(str){
        str = str || '';
        var xmlchar = {
            //"&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "'": "&#39;",
            '"': "&quot;",
            "{": "&#123;",
            "}": "&#125;",
            "@": "&#64;"
        };
        return str.replace(/[<>'"\{\}@]/g, function($1){
            return xmlchar[$1];
        });
    };

    /**
     * 判断数据类型
     * @param obj
     */
    var checkType = function(obj){
        var text = obj.constructor.toString();
        return text.match(/function (.*)\(/)[1].toLowerCase();
    };

    /**
     * 将debug信息插入到调试框中
     * @param debugInfo
     */
    var appendDebugInfo = function(debugInfo){
        var $log = $('#J_log'),
            str = '<li>'+ debugInfo + '</li>';//<span class="J_log_dtime"> //Log Time'+ Date.now() +'</span>
        if(!$log.length){
            $log = $('<ol id="J_log" class="J_log"></ol>').appendTo($('body'));
        }
        $log.append(str);
    };

    /**
     * 处理log数据的关键函数
     * @param arg
     * @returns {string}
     */
    var escapeLog = function(arg){
        var str = '',
            type = checkType(arg);
        if(type === 'array'){
            str += '<span class="J_log_arr">[';
            arg.forEach(function(item){
                var _check  = checkType(item);
                if(_check === 'array' || _check === 'object'){
                    str += escapeLog(item);
                }else{
                    str += '<span class="J_log_arr_item">'+ item.toString() +'</span>';
                }
            });
            str += ']</span>';
        }else if(type === 'object'){
            str += '<span class="J_log_obj">{';
            for(var i in arg){
                str += escapeLog(arg[i])
            }
            str += '}</span>';
        }else{
            str += '<span class="J_log_'+ type +'">'+ arg.toString() +'</span>';
        }
        return str;
    };

    $.log = log;

})(Zepto);