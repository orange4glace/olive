#include "decoder/memory_pool.h"

namespace olive {

void* MemoryPool::Allocate(size_t byte) {
  std::unique_lock<std::mutex> lock(m_);
  void* memory;
  auto& vec = pool_[byte];
  if (vec.size()) {
    memory = vec.back();
    vec.pop_back();
  }
  else {
    memory = (void*)(new uint8_t[byte]);
  }
  return memory;
}

void MemoryPool::Free(void* ptr, size_t byte) {
  std::unique_lock<std::mutex> lock(m_);
  pool_[byte].push_back(ptr);
}

std::mutex MemoryPool::m_;

}