#include "logger/logger.h"

#include "spdlog/sinks/stdout_color_sinks.h"

namespace olive {

void logger::Initialize() {
  logger_ = spdlog::stdout_color_mt("console");
}

spdlog::logger* logger::get() {
  return logger_.get();
}

std::shared_ptr<spdlog::logger> logger::logger_;
  
}