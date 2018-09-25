#ifndef OLIVE_LOGGER_H_
#define OLIVE_LOGGER_H_

#include "spdlog/spdlog.h"

namespace olive {

class logger {
public:
  static void Initialize();
  static spdlog::logger* get();

private:
  static std::shared_ptr<spdlog::logger> logger_;

}; // class logger

} // namespace olive

#endif // OLIVE_LOGGER_H_