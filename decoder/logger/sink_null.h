#ifndef OLIVE_LOGGER_SINK_NULL
#define OLIVE_LOGGER_SINK_NULL

namespace olive {

struct SinkNull {
  /*
  template<typename... Args>
  void log(level::level_enum lvl, const char *fmt, const Args &... args) {}

  template<typename... Args>
  void log(level::level_enum lvl, const char *msg) {}
  */

  template<typename... Args>
  void trace(const char *fmt, const Args &... args) {}

  template<typename... Args>
  void debug(const char *fmt, const Args &... args) {}

  template<typename... Args>
  void info(const char *fmt, const Args &... args) {}

  template<typename... Args>
  void warn(const char *fmt, const Args &... args) {}

  template<typename... Args>
  void error(const char *fmt, const Args &... args) {}

  template<typename... Args>
  void critical(const char *fmt, const Args &... args) {}
};

}

#endif // OLIVE_LOGGER_SINK_NULL