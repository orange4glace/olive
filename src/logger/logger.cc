#include "logger/logger.h"

#include "spdlog/sinks/stdout_color_sinks.h"

namespace olive {

#ifndef LOGGER_SINK_NULL
void logger::Initialize() {
  logger_ = spdlog::stdout_color_mt("console");
}

spdlog::logger* logger::get() {
  return logger_.get();
}

#else

void logger::Initialize() {
}

SinkNull* logger::get() {
  return &sink_null;
}
#endif

#ifndef LOGGER_SINK_NULL
std::shared_ptr<spdlog::logger> logger::logger_;
#else
SinkNull logger::sink_null;
#endif
  
}