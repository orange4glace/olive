#ifndef OLIVE_OBJECT_POOL_H_
#define OLIVE_OBJECT_POOL_H_

#include <set>
#include <mutex>

namespace olive {

template <typename T>
class ObjectPool {

public:
  ObjectPool() {}

  template <typename ... Types>
  T* Allocate(Types ... args) {
    std::unique_lock<std::mutex> lock(m_);
    T* ret = NULL;
    if (pool_.size()) {
      ret = pool_.back();
      pool_.pop_back();
      ret = T(args);
    }
    else {
      lock.unlock();
      ret = new T(args);
    }
    return ret;
  }

  void Free(T* obj) {
    std::unique_lock<std::mutex> lock(m_);
    pool_.emplace_back(obj);
  }

private:
  std::vector<T*> pool_;
  std::mutex m_;

};

}

#endif // OLIVE_OBJECT_POOL_H_