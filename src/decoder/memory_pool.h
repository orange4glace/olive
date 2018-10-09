#ifndef OLIVE_MEMORY_POOL_H_
#define OLIVE_MEMORY_POOL_H_

#include <map>
#include <vector>
#include <mutex>

namespace olive {

class MemoryPool {
public:
  static void* Allocate(size_t byte);
  static void Free(void* addr, size_t byte);

private:
  static std::mutex m_;
  static std::map<size_t, std::vector<void*> > pool_;

};

} //namespace olive

#endif // OLIVE_MEMORY_POOL_H_