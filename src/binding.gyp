{
  "targets": [
    {
      "target_name": "module",
      "sources": [
        "module.cc",

        "napi/napi.cc",
        "napi/es6/map.cc",
        "napi/es6/observable_map.cc",

        "timeline/timeline.cc",
        "timeline/timeline_layer.cc",
        "timeline/timeline_item.cc",

        "resource/resource_manager.cc",
        "resource/video_resource.cc",

        "resource/resource_manager.cc",
        "resource/video_resource.cc",
      ],
      "include_dirs": [
        "./",
        "$(BOOST)/"
      ],
      "defines": [
        "__STDC_CONSTANT_MACROS"
      ]
    }
  ]
}