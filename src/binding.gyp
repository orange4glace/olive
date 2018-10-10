{
  "targets": [
    {
      "target_name": "module",
      "sources": [
        "module.cc",

        "logger/logger.cc",

        "napi/napi.cc",
        "napi/napi_instanceable.cc",
        "napi/es6/map.cc",
        "napi/es6/observable_map.cc",

        "timeline/timeline.cc",
        "timeline/timeline_layer.cc",
        "timeline/timeline_item.cc",

        "resource/resource_manager.cc",
        "resource/resource.cc",
        "resource/video_resource.cc",

        "decoder/memory_pool.cc",
        "decoder/decoder_manager.cc",
        "decoder/decoder.cc",
        "decoder/video_decoder_host.cc",
        "decoder/video_decoder.cc",
      ],
      "include_dirs": [
        "./",
        "$(BOOST)/",
        "$(FFMPEG)/include",
        "../spdlog/include/",
      ],
      "defines": [
        "__STDC_CONSTANT_MACROS"
      ],
      "libraries": [
        "$(FFMPEG)/lib/avcodec",
        "$(FFMPEG)/lib/avdevice",
        "$(FFMPEG)/lib/avfilter",
        "$(FFMPEG)/lib/avformat",
        "$(FFMPEG)/lib/avutil",
        "$(FFMPEG)/lib/postproc",
        "$(FFMPEG)/lib/swresample",
        "$(FFMPEG)/lib/swscale"
      ]
    }
  ]
}