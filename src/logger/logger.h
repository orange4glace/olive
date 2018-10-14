#ifndef OLIVE_LOGGER_H_
#define OLIVE_LOGGER_H_

#include "spdlog/spdlog.h"

#ifdef LOGGER_SINK_NULL
#include "logger/sink_null.h"
#endif

namespace olive {

class logger {
public:
  static void Initialize();

#ifndef LOGGER_SINK_NULL
  static spdlog::logger* get();
#else
  static SinkNull* get();
#endif

private:
  static std::shared_ptr<spdlog::logger> logger_;
#ifdef LOGGER_SINK_NULL
  static SinkNull sink_null;
#endif

}; // class logger

} // namespace olive

#endif // OLIVE_LOGGER_H_