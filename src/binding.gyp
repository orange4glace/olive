{
  "targets": [
    {
      "target_name": "module",
      "sources": [
        "module.cc",

        "logger/logger.cc",

        "napi/napi.cc",
        "napi/es6/map.cc",
        "napi/es6/observable_map.cc",

        "timeline/timeline.cc",
        "timeline/timeline_layer.cc",
        "timeline/timeline_item.cc",

        "resource/resource_manager.cc",
        "resource/resource.cc",
        "resource/video_resource.cc",

        "decoder/decoder_manager.cc",
        "decoder/video_decoder.cc",
      ],
      "include_dirs": [
        "./",
        "$(BOOST)/",
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/include",
        "../spdlog/include/",
      ],
      "defines": [
        "__STDC_CONSTANT_MACROS"
      ],
      "libraries": [
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/lib/avcodec",
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/lib/avdevice",
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/lib/avfilter",
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/lib/avformat",
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/lib/avutil",
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/lib/postproc",
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/lib/swresample",
        "D:/cpplib/ffmpeg-20180816-fe06ed2-win64-dev/lib/swscale"
      ]
    }
  ]
}