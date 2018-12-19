; (function ()
{
    var Temp = template.compile(jQuery.GetTemplate(function ()
    {
        /*
        <div class="contact_us p_{{Position}} {{Align}}">
        <div class="icon1">
        <div>在线<br />客服</div>
        </div>
        <div class="icon2">
        <div>问题<br />反馈</div>
        </div>
        <div class="icon3">
        <div>关注<br />微信</div>
        <div class="code"></div>
        </div>
        </div>
        */
    }));

    var Temp_Online = template.compile(jQuery.GetTemplate(function ()
    {
        /*
        <div class="online">
        <table class="ctn_left">
        <tr><td colspan="2"><div class="icon_tel"></div><div class="title">电话咨询</div></td></tr>
        <tr><td class="label">电话：</td><td>0573-82229995</td></tr>
        <tr><td class="label">传真：</td><td>0573-82651457</td></tr>
        <tr><td class="label">水务营销部：</td><td>0573-82651029</td></tr>
        <tr><td class="label">水利营销部：</td><td>0573-82651658</td></tr>
        <tr><td class="label">软件客服：</td><td>0573-82226669</td></tr>
        <tr><td class="label"></td><td>0573-82229997</td></tr>
        </table>
        <table class="ctn_right">
        <tr><td colspan="2"><div class="icon_qq"></div><div class="title">在线客服</div></td></tr>
        <tr><td class="label">客服1</td><td><a target="blank" href="http://wpa.qq.com/msgrd?v=3&uin=3020817600&site=qq&menu=yes"><span class="qq"></span></a></td></tr>
        <tr><td class="label">客服2</td><td><a target="blank" href="http://wpa.qq.com/msgrd?v=3&uin=1296407201&site=qq&menu=yes"><span class="qq"></span></a></td></tr>
        </table>
        </div>
        */
    }));

    var Temp_Feedback = template.compile(jQuery.GetTemplate(function ()
    {
        /*
        <table class="feedback">
        <tr><td class="label">描述：</td><td colspan="2"><textarea class="description" placeholder=" "></textarea></td></tr>
        <tr><td class="label">联系方式：</td><td colspan="2"><input type="text" class="contact_info" placeholder="留下您的邮箱或手机号，便于我们及时回复您。" /></td></tr>
        <tr><td class="label"></td><td colspan="2"><div class="picture">添加图片</div><div class="attachment">添加附件</div></td></tr>
        <tr><td class="label"></td><td><div class="pictures"></div></td><td><div class="attachments"></div></td></tr>
        <tr><td class="label"></td><td colspan="2"></td></tr>
        <tr><td class="label">接收人：</td><td colspan="2" class="linkman">
        <div><span class="label">公司领导：</span>
        <div class="checkbox"><span class="icon"></span><span class="label">总经理</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">副总经理</span></div>
        </div>
        <div><span class="label">部门经理：</span>
        <div class="checkbox"><span class="icon"></span><span class="label">市场部</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">工程部</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">实施部</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">软件部</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">工程委员会</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">产品委员会</span></div>
        </div>
        <div><span class="label">项目人员：</span>
        <div class="checkbox"><span class="icon"></span><span class="label">市场</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">工程</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">实施</span></div>
        <div class="checkbox"><span class="icon"></span><span class="label">软件</span></div>
        </div>
        </td></tr>
        <tr><td colspan="3" class="confirm"><button>提交反馈</button></td></tr>
        </table>
        */
    }));

    var DefaultOptions =
    {
        Position: "right", //left/top/right/bottom
        Align: "middle", //left/center/right/top/middle/bottom
        Skin: "Default",
        GetCurrent: function ()
        {
            return { cnm: "", unm: "", menu: { Name: "", Val: ""} };
        }
    };

    jQuery.extend(
    {
        ContactUs: function (Options)
        {
            var Opts = jQuery.extend(true, {}, DefaultOptions, Options);

            // var Skin = jQuery.ImplantStyle("ContactUs", (Opts.Skin || "Default"), function ()
            //  {
            var Ele = jQuery(Temp(Opts)).appendTo(document.body);
            if (Opts.Position === "left" || Opts.Position === "right")
            {
                switch (Opts.Align)
                {
                    case "top":
                        {
                            Ele.css("top", 0);
                        }
                        break;
                    case "bottom":
                        {
                            Ele.css("bottom", 0);
                        }
                        break;
                    default:
                        {
                            Ele.css("top", Math.floor((jQuery(window).height() - Ele.height()) / 2));
                        }
                        break;
                }
            }
            else
            {
                switch (Opts.Align)
                {
                    case "left":
                        {
                            Ele.css("left", 0);
                        }
                        break;
                    case "right":
                        {
                            Ele.css("right", 0);
                        }
                        break;
                    default:
                        {
                            Ele.css("left", Math.floor((jQuery(window).width() - Ele.height()) / 2));
                        }
                        break;
                }
            }

            Ele.find(">div").click(function (Evt)
            {
                if (jQuery(this).hasClass("icon1"))
                {
                    ShowDialog({ Title: "在线客服", Content: function (Container)
                    {
                        Container.html(Temp_Online({}));
                    }
                    }, {}, function (Result) { });
                }
                else if (jQuery(this).hasClass("icon2"))
                {
                    var Current = Opts.GetCurrent();
                    var Url = "https://www.dlmeasure.com/feedbackv2.html?cnm=" + Current.cnm + "&unm=" + Current.unm + "&funnm=" + Current.menu.Name + "&funurl=" + Current.menu.Val;
                    ShowDialog({ Title: "问题反馈", Content: function (Container)
                    {
                        Container.html("<iframe frameborder=\"0\" src=\"" + Url + "\" style=\"width: 780px; height: 500px;\"></iframe>");
                    }
                    }, {}, function (Result) { });
                }
            });
            // });
        }
    });
})();