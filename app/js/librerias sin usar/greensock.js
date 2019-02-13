if ($("#ippConvenios-thankyou").length != 0) {
  var mailBoxpole = $("#pole"),
    buzonBody = $("#buzon #mainbox_3_"),
    buzonFlag = $("#buzon #flag_3_"),
    buzonEnvelope = $("#buzon #envelope_6_"),
    buzonBgCircle = $("#boxBG #bg_1_ #mainbg_1_"),
    buzonBgDeco = $("#boxBG #decor_1_ path"),
    extraMail = $("#news"),
    airplane = $("#avion"),
    logo = $("#logo"),
    respuesta = $("#porTuRspuesta"),
    tl;
  tl = new TimelineMax();
  var mediumBg = ["#background #bgCircle", "#background #extendedbg", "#background #lightFingerFirst", "#background #lightFingerSecond", "#background #lightFingerThird"];
  var darkFingers = ["#darkfinger2", "#darkfinger"];
  var lightOveeLapBg = ["#ovelightbg #mainbg", "#ovelightbg #bgextend", "#ovelightbg #insidefinger", "#ovelightbg #finger2", "#ovelightbg #finger1"];
  var clouds = ["#nubesizquierda", "#nubederecha", "#nubescentral"];
  var threes = ["#arbolitos #grande_1_", "#arbolitos #peque_1_"];
  var mata1 = ["#matacompleta #shadowFix_2_", "#matacompleta #mata_2_ #piso_1_"];
  var mata2 = ["#matacompleta #mata_2_ #hoja1_1_", "#matacompleta #mata_2_ #hoja2_1_", "#matacompleta #mata_2_ #hoja3_1_", "#matacompleta #mata_2_ #hoja4_1_"];
  var buzonBgsidesLeft = ["#boxBG #bg_1_ #leftF_1_", "#boxBG #bg_1_ #topFLeft_1_"];
  var buzonBgsidesRight = ["#boxBG #bg_1_ #rightF_1_", "#boxBG #bg_1_ #topFRight_1_"];
  var thanks = ["#gracias #g", "#gracias #r", "#gracias #a", "#gracias #c", /*"#gracias #i",*/ "#gracias #a_1_", "#gracias #s"];
  // var buzonBgDeco = ["#boxBG path"]
  tl.set(mediumBg, {
    scale: 0
  });
  tl.set(darkFingers, {
    xPercent: 200
  });
  tl.set(lightOveeLapBg, {
    scale: 0
  });
  tl.set(clouds, {
    scale: 0
  });
  tl.set(threes, {
    scale: 0
  });
  tl.set(mata1, {
    scaleY: 0
  });
  tl.set(mata2, {
    scaleY: 0
  });
  tl.set([mailBoxpole], {
    scaleY: 0
  });
  tl.set([buzonBody], {
    scaleY: 0
  });
  tl.set([buzonFlag], {
    scaleY: 0
  });
  tl.set([buzonEnvelope], {
    scaleX: 0,
    opacity: 0
  });
  tl.set([buzonBgCircle], {
    scale: 0,
    opacity: 0,
  });
  tl.set(buzonBgsidesLeft, {
    scaleX: 0,
    opacity: 0,
  });
  tl.set(buzonBgsidesRight, {
    scaleX: 0,
    opacity: 0,
  });
  tl.set([buzonBgDeco], {
    opacity: 0,
  });
  tl.set([extraMail], {
    xPercent: 120,
    opacity: 0,
  });
  tl.set([airplane], {
    xPercent: 120,
    yPercent: 120,
    opacity: 0,
  });
  tl.set([logo], {
    scale: 0,
  });
  tl.set(thanks, {
    scale: 0,
  });
  tl.set([respuesta], {
    xPercent: -200,
    scale: 0
  });
  tl.staggerTo(mediumBg, 1, {
    scale: "1",
    ease: Power4.easeOut
  }, 0.2);
  tl.staggerTo(darkFingers, 1, {
    xPercent: "0",
    ease: Power4.easeOut
  }, 0, "mediumBg");
  tl.staggerTo(lightOveeLapBg, 1, {
    scale: "1",
    ease: Power4.easeOut
  }, 0, "mediumBg");
  tl.staggerTo(clouds, 1, {
    scale: "1",
    ease: Power4.easeOut
  }, 0, "lightOveeLapBg");
  tl.staggerTo(threes, 1, {
    scale: "1",
    ease: Power4.easeOut
  }, 0, "lightOveeLapBg");
  tl.staggerTo(mata1, 1, {
    scaleY: 1,
    ease: Power4.easeOut
  }, 1, "lightOveeLapBg");
  tl.staggerTo(mata2, 1, {
    scaleY: 1,
    transformOrigin: "bottom",
    ease: Power4.easeOut
  }, 1, "mata1");
  tl.staggerTo(mailBoxpole, 1, {
    scaleY: 1,
    transformOrigin: "bottom",
    ease: Power4.easeOut
  }, 1, "mata2");
  tl.staggerTo(buzonBody, 1, {
    scaleY: 1,
    transformOrigin: "bottom",
    ease: Power4.easeOut
  }, 1, "mailBoxpole");
  tl.staggerTo(buzonFlag, 1, {
    scaleY: 1,
    transformOrigin: "bottom",
    ease: Power4.easeOut
  }, 1, "buzonBody");
  tl.staggerTo(buzonEnvelope, 1, {
    scaleX: 1,
    opacity: 1,
    transformOrigin: "right",
    ease: Power4.easeOut
  }, 1, "buzonFlag");
  tl.staggerTo(buzonBgCircle, 1, {
    scale: 1,
    opacity: 1,
    transformOrigin: "center",
    ease: Power4.easeOut
  }, 1, "buzonFlag");
  tl.staggerTo(buzonBgsidesLeft, 1, {
    scaleX: 1,
    opacity: 1,
    transformOrigin: "right",
    ease: Power4.easeOut
  }, 1, "buzonBgCircle");
  tl.staggerTo(buzonBgsidesRight, 1, {
    scaleX: 1,
    opacity: 1,
    transformOrigin: "left",
    ease: Power4.easeOut
  }, 1, "buzonBgCircle");
  tl.staggerTo(buzonBgDeco, 1, {
    opacity: 1,
    ease: Power4.easeOut
  }, 1, "buzonBgsidesRight");
  tl.staggerTo(extraMail, 1, {
    opacity: 1,
    xPercent: "0",
    ease: Power4.easeOut
  }, 1, "buzonBgsidesRight");
  tl.staggerTo(airplane, 1, {
    opacity: 1,
    xPercent: "0",
    yPercent: "0",
    ease: Power4.easeOut
  }, 1, "buzonBgsidesRight");
  tl.staggerTo(logo, 1, {
    scale: 1,
    ease: Power4.easeOut
  }, 1, "buzonBgsidesRight");
  tl.staggerTo(thanks, 1, {
    scale: 1,
    ease: Power4.easeOut
  }, 0.5, "logo");
  tl.staggerTo(respuesta, 1, {
    xPercent: 0,
    scale: 1,
    ease: Power4.easeOut
  }, 0.5, "thanks");
  tl.staggerTo(clouds, 2, {
    xPercent: 10,
    repeat: 10,
    ease: Power0.easeInOut,
    yoyo: true
  }, 0, "lightOveeLapBg+=2");
  tl.staggerTo(threes, 1.5, {
    scale: 1.3,
    repeat: 11,
    ease: Power0.easeInOut,
    yoyo: true
  }, 0, "lightOveeLapBg+=2");
  tl.staggerTo(buzonFlag, 1, {
    rotation: 20,
    repeat: 10,
    ease: Power0.easeInOut,
    yoyo: true
  }, 0, "buzonBody+=2");
  tl.staggerTo(buzonBgDeco, 3, {
    rotation: 360,
    transformOrigin: "center",
    repeat: 10,
    ease: Power0.easeInOut,
    yoyo: true
  }, 0, "buzonBgCircle+=2");
}